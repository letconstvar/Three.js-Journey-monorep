uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  vUv = uv;

  float range = sin(position.x * uFrequency + uTime * uSpeed) * uAmplitude;
  vec3 newPosition = vec3(position.x, position.y + range, position.z);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}