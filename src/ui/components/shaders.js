export const vertexShader = `
  attribute vec2 a_position;
  uniform vec2 u_resolution;
  uniform vec2 u_translate;
  
  void main() {
    vec2 pos = a_position + u_translate;
    vec2 position = ((pos / (u_resolution / 2.0)) - 1.0) * vec2(1, -1);
    
    gl_Position = vec4(position, 0, 1);
  }
`;

export const fragmentShader = `
  precision mediump float;
  
  void main() {
    gl_FragColor = vec4(0, 188.0 / 255.0, 210.0 / 255.0, 1);
  }
`;
