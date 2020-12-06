export const vertexShader = `
  attribute vec2 a_position;
  attribute float a_pointId;
  
  uniform vec2 u_resolution;
  uniform vec2 u_translate;
  
  varying float v_pointId;
  
  void main() {
    v_pointId = a_pointId;
    
    vec2 pos = a_position + u_translate;
    vec2 position = ((pos / (u_resolution / 2.0)) - 1.0) * vec2(1, -1);
    
    gl_Position = vec4(position, 0, 1);
  }
`;

export const fragmentShader = `
  precision mediump float;
  uniform float u_selectedId;
  varying float v_pointId;
  
  void main() {
    vec4 color = vec4(0, 188.0 / 255.0, 210.0 / 255.0, 1);
    
    if (u_selectedId == v_pointId) {
      color = vec4(150.0 / 255.0, 50.0 / 255.0, 189.0 / 255.0, 1);
    }
    
    gl_FragColor = color;
  }
`;
