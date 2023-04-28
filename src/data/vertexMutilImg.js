const vertexMutilImg = `
uniform vec2 uScroll;
uniform vec2 uOffset;
varying vec2 vUv;

varying vec4 vertTexCoord;
vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
  float PI = 3.1415926535897932384626433832795;
// position.x = position.x + (sin(uv.y * PI) * offset.x);
  position.y = position.y + (sin(uv.x * PI) * offset.y);
  return position;
}
void main() {
  vUv = uv;
  vec3 newPosition = position;
  newPosition = deformationCurve(position,uv,uScroll);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}



`
export default vertexMutilImg


//BASIC
/* varying vec2 vUv;

void main() {
    vUv = uv;

    gl_Position =   projectionMatrix * 
                    modelViewMatrix * 
                    vec4(position,1.0);
} */


/* UNROLL
uniform float time;
uniform float uAngel;
uniform float uProcess;
uniform vec4 resolution;
varying vec2 vUv;
varying float vFrontShadow;
// varying float vBackShadow;
// varying float vProgress;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;

const float pi = 3.1415925;

mat4 rotationMatrix(vec3 axis, float uAngel) {
    axis = normalize(axis);
    float s = sin(uAngel);
    float c = cos(uAngel);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}
vec3 rotate(vec3 v, vec3 axis, float uAngel) {
  mat4 m = rotationMatrix(axis, uAngel);
  return (m * vec4(v, 1.0)).xyz;
}


void main() {
  vUv = uv;
  float pi = 3.14159265359;


  float finaluAngel = uAngel - 0.*0.3*sin(uProcess*6.);

  // @todo account for aspect ratio!!!
  vec3 newposition = position;

  // float uAngel = pi/10.;
  float rad = 0.1;
  float rolls = 8.;
  // rot
  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),-finaluAngel) + vec3(-.5,.5,0.);

  float offs = (newposition.x + 0.5)/(sin(finaluAngel) + cos(finaluAngel)) ; // -0.5..0.5 -> 0..1
  float tProgress = clamp( (uProcess - offs*0.99)/0.01 , 0.,1.);

  // shadows
  vFrontShadow = clamp((uProcess - offs*0.95)/0.05,0.7,1.);
  // vBackShadow = 1. - clamp(abs((uProcess - offs*0.9)/0.1),0.,1.);
  // vProgress = clamp((uProcess - offs*0.95)/0.05,0.,1.);

  

  newposition.z =  rad + rad*(1. - offs/2.)*sin(-offs*rolls*pi - 0.5*pi);
  newposition.x =  - 0.5 + rad*(1. - offs/2.)*cos(-offs*rolls*pi + 0.5*pi);
  // // rot back
  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),finaluAngel) + vec3(-.5,.5,0.);
  // unroll
  newposition = rotate(newposition - vec3(-.5,0.5,rad), vec3(sin(finaluAngel),cos(finaluAngel),0.), -pi*uProcess*rolls);
  newposition +=  vec3(
    -.5 + uProcess*cos(finaluAngel)*(sin(finaluAngel) + cos(finaluAngel)), 
    0.5 - uProcess*sin(finaluAngel)*(sin(finaluAngel) + cos(finaluAngel)),
    rad*(1.-uProcess/2.)
  );

  // animation
  vec3 finalposition = mix(newposition,position,tProgress);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0 );
}

*/