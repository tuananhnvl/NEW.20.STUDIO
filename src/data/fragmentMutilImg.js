const fragmentMutilImg = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uPixel;
uniform vec2 uMouse;
uniform float uProcess;
uniform float uTime;
varying vec2 vUv;

void main()
{
    float waveStrength = 0.02;
    float frequency = 30.0;
    float waveSpeed = 5.0;
    vec4 sunlightColor = vec4(1.0,0.91,0.75, 1.0);
    float sunlightStrength = 5.0;
    float centerLight = 2.;
    float oblique = .25; 
        
    vec2 tapPoint = vec2(uMouse.x/uPixel.x,uMouse.y/uPixel.y);
	
    vec2 uv = gl_FragCoord.xy / uPixel.xy;
    float modifiedTime = uTime * waveSpeed;
    float aspectRatio = uPixel.x/uPixel.y;
    vec2 distVec = uv - tapPoint;
    distVec.x *= aspectRatio;
    float distance = length(distVec);
    
    float multiplier = (distance < 1.0) ? ((distance-1.0)*(distance-1.0)) : 0.0;
    float addend = (sin(frequency*distance-modifiedTime)+centerLight) * waveStrength * multiplier;
    vec2 newTexCoord = uv + addend*oblique;    
    
    vec4 colorToAdd = sunlightColor * sunlightStrength * addend;
    
    gl_FragColor = texture(uTexture1, newTexCoord) + colorToAdd;
}
`
export default fragmentMutilImg

/* SHADOW OFF UNROLL VERTEX

vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

	gl_FragColor = texture2D(texture1,newUV);
    gl_FragColor.rgb *=vFrontShadow;
    gl_FragColor.a = clamp(progress*5.,0.,1.);
*/


/* BASIC


uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uPixel;
uniform float uProcess;
varying vec2 vUv;


  TRANSITION BETWEEN 2 IMGAE , WIDTH ANGEL
 vec2 uv = gl_FragCoord.xy/uPixel.xy;
  float delayValue = uProcess*2. - uv.y + uv.x;
  delayValue = clamp(delayValue,0.,1.);
  vec4 textureImage1 = texture2D(uTexture1, vUv);
  vec4 textureImage2 = texture2D(uTexture2, vUv);
  vec4 mixImg = mix(textureImage1,textureImage2,delayValue);
  gl_FragColor = mixImg;
//  gl_FragColor = vec4(delayValue);

*/