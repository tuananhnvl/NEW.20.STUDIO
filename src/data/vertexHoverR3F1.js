const vertexHoverR3F1 = 
/* `
uniform float u_time;

varying float vZ;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  modelPosition.y += sin(modelPosition.x * 3.0 + u_time / 2.0 * 2.0) * 0.05;
  modelPosition.y += cos(modelPosition.z * 3.0 + u_time * 1.0) * 0.05;
  modelPosition.y += sin(modelPosition.z * 3.0 + u_time * 3.0) * 0.1;
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
` */
`
uniform vec2 uOffset;
varying vec2 vUv;

varying vec4 vertTexCoord;
vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
  float M_PI = 3.1415926535897932384626433832795;
  position.x = position.x + (cos(uv.y * (15.0 * M_PI)) * offset.x);
  position.y = position.y + (cos(uv.x * (15.0 * M_PI)) * offset.y);
 // position.y = position.y + (pow(uv.x,2.0) / float(4.0 * offset.y));
  return position;
}
void main() {
  vUv = uv;
  vec3 newPosition = position;
  newPosition = deformationCurve(position,uv,uOffset);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`
export default vertexHoverR3F1
