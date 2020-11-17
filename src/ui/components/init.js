import { createProgram } from './createProgram';
import { createShader } from './createShader';
import { fragmentShader, vertexShader } from './shaders';
import { getRectangle } from './getRectangle';

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
    ...getRectangle(400, 500, 500, 250),
    ...getRectangle(100, 300, 100, 50),
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const a_position = gl.getAttribLocation(program, 'a_position');
  const u_resolution = gl.getUniformLocation(program, 'u_resolution');
  const u_translate = gl.getUniformLocation(program, 'u_translate');

  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);

  return { gl, program, positions, u_resolution, u_translate };
};
