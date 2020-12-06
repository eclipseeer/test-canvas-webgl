import { createProgram } from './lib/createProgram';
import { createShader } from './lib/createShader';
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

  const a_position = gl.getAttribLocation(program, 'a_position');
  const a_pointId = gl.getAttribLocation(program, 'a_pointId');

  const u_resolution = gl.getUniformLocation(program, 'u_resolution');
  const u_translate = gl.getUniformLocation(program, 'u_translate');
  const u_selectedId = gl.getUniformLocation(program, 'u_selectedId');

  // prettier-ignore
  const positions = new Float32Array([
    ...getRectangle(400, 500, 500, 250),
    ...getRectangle(100, 300, 100, 50),
  ]);
  // prettier-ignore
  const ids = new Float32Array([
    1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2,
  ]);

  const bufferPositions = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferPositions);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

  const idsPositions = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, idsPositions);
  gl.bufferData(gl.ARRAY_BUFFER, ids, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(a_pointId);
  gl.vertexAttribPointer(a_pointId, 1, gl.FLOAT, false, 1 * Float32Array.BYTES_PER_ELEMENT, 0);

  gl.useProgram(program);

  return {
    gl,
    program,
    positions,
    uniforms: {
      u_resolution,
      u_translate,
      u_selectedId,
    },
  };
};
