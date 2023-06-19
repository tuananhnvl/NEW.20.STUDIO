const vertexShader = `
uniform float checkProcess;
uniform vec2 uOffset;
uniform vec2 uZoomScale;
uniform float uProcess;
varying vec2 vUv;
uniform float uTime;
uniform vec2 iResolution;
uniform vec2 imageBounds;
uniform float uScroll;
uniform float uTarget;
//custom == when drag x y , scroll z , mix z to wave function , set uscroll to controls anime

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset, float wave,float centerPoint,float uScroll) {
  float M_PI = 3.1415926535897932384626433832795;
  position.x = position.x + (sin(uv.y * M_PI) * offset.x);
  position.y = position.y + (sin(uv.x * M_PI) * offset.y);
  position.z = position.z + wave * centerPoint * uScroll * 2.5;
  return position;
}


void main() {
  vUv = uv;
  vec3 newPosition = position;
  vec3 newPosition1 = position;

  float angle = (uScroll * 4.20) * 3.14159265 / 2.;
  //uProcess not use
  // set sin(angle) to cos(angle) = > reveal sin thieu
  float wave = cos(angle); 
  
  float center = cos(length(uv - .5) * 2.101235);

  newPosition = deformationCurve(position,uv,uOffset,wave,center,(uScroll * 4.20));
  vec3 finalPosInAnim =  mix(newPosition,newPosition1,0.5);


  vec3 currentPos = position;
  vec3 newForOnly = vec3(finalPosInAnim.x,finalPosInAnim.y,uTarget);
  vec3 onlyPosInAnim = mix(currentPos,newForOnly,1.0);

  vec3 twoOp = mix(finalPosInAnim,newForOnly,0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(twoOp, 1.0 );

}
`

const fragmentShader = `
varying float checkObj;
varying vec2 vUv;
uniform vec2 scale;
uniform vec2 imageBounds;
uniform vec3 color;
uniform vec2 iResolution;
uniform float zoom;
uniform float grayscale;
uniform float opacity;
uniform float uRandom;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uScroll;
uniform vec2 uOffset;
const vec3 luma = vec3(.299, 0.587, 0.114);
float seed = 16.0;


float keytoChangePos = 4.0;
vec3 rgbShift(sampler2D tex, vec2 uv, vec2 offset,float random) {
  return vec3(texture2D(tex,vUv + offset).rgb);
}


float sinNoise(vec2 uv,float random)
{
    return fract(abs(sin(uv.x * random + uv.y * 3077.0) * 53703.27));
}


vec4 toGrayscale(vec4 color, float intensity) {
  return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
}



vec2 aspect(vec2 size) {
  return size / min(size.x, size.y);
}

float r(vec2 p){return fract(cos(mod(123456789.,256.*dot(p,vec2(23.140692632779,2.6651441426902)))));}

float valueNoise(vec2 uv, float scale, float randomNumFrom1)
{
    vec2 luv = fract(uv * scale);
    vec2 luvs = smoothstep(0.0, 1.0, fract(uv * scale));
    vec2 id = floor(uv * scale);
    float tl = sinNoise(id + vec2(0.0, 1.0),randomNumFrom1);
    float tr = sinNoise(id + vec2(1.0, 1.0),randomNumFrom1);
    float t = mix(tl, tr, luvs.x);
    
    float bl = sinNoise(id + vec2(0.0, 0.0),randomNumFrom1);
    float br = sinNoise(id + vec2(1.0, 0.0),randomNumFrom1);
    float b = mix(bl, br, luvs.x);
    
    return mix(b, t, luvs.y) * 2.0 - 1.0;
}

void main()
{
  vec4 finalVec = vec4(0.0, 0.0, 0.0, 0.0); 
  vec2 s = aspect(scale);
  vec2 bv = aspect(imageBounds);
  float rs = s.x / s.y;
  float ri = bv.x / bv.y;
  vec2 new = rs < ri ? vec2(bv.x * s.y / bv.y, s.y) : vec2(s.x, bv.y * s.x / bv.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 uvd = vUv * s / new + offset;
  // set zoom base uscroll
  vec2 zUv = (uvd - vec2(0.5, 0.5)) /(zoom + 0.0)  + vec2(0.5, 0.5);

  vec2 stx = vUv.xy/bv.xy;
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    //uv.y /= bv.x / bv.y;
    
 //  float sinN = sinNoise(uv);
    
    float scaleNoiseShape =3.0;
 
   float fractValue = 0.0;
    float amp = 1.0;
    for(int i = 0; i < 16; i++)
    {
      fractValue += valueNoise(uv, float(i ) * scaleNoiseShape ,uRandom) * amp;
        amp /= 2.0;
    }
    
    fractValue /= 2.0;
    fractValue += 0.5;
   
    float time = mix(-1.0, 1.0,uTime);
    //time = 1.0;
    float cutoff = smoothstep(time+ 0.0001, time- 0.0001, fractValue);
    
    
    vec4 texture1 = vec4(vec3(1.0,1.0,1.0), 1.0);
    //not use zUv ( zUv for zoom , on base frag Image Drei => not fix) => solution for exacly ratio image is replace by vUv
 

   // vec4 textureFinal = mix(vec4(vec3(0.0,0.0,0.0), 0.0), vec4(vec3(3.0,3.0,3.0), 1.0), cutoff);

   vec3 color = rgbShift(uTexture,vUv,uOffset,fractValue);

   vec4 textureFinal = mix(vec4(vec3(0.0,0.0,0.0), 0.0), vec4(color,vUv), cutoff);
    gl_FragColor = textureFinal;

}

`

const shaderGallery = {'vert': vertexShader, 'frag':fragmentShader}
export default shaderGallery