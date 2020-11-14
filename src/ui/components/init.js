import { createProgram } from './createProgram';
import { createShader } from './createShader';
import { fragmentShader, vertexShader } from './shaders';

export const init = canvas => {
  const gl = canvas.getContext('webgl');

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = createProgram(gl, vertex, fragment);

  gl.clearColor(215 / 255, 225 / 255, 225 / 255, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //prettier-ignore
  const positions = new Float32Array([
    100, 100, 100, 120, 500, 120,
    100, 100, 500, 100, 500, 120
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  return { gl, program, positions };
};
