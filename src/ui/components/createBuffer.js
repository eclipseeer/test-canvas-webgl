export const createBuffer = ({ gl, program }) => {
  // при ініціалізації
  // prettier-ignore

  const positions = new Float32Array([
    100, 100,
    500, 500,
    500, 100,
    700, 600,
    1750, 671,
    650, 850,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  /*********************************************************************/

  const a_position = gl.getAttribLocation(program, 'a_position');
  const u_resolution = gl.getUniformLocation(program, "u_resolution");

  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(
    a_position, // Attribute location
    2, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    false,
    0, // Size of an individual vertex
    0, // Offset from the beginning of a single vertex to this attribute
  );

  // console.log(gl.getParameter(gl.VIEWPORT));


  gl.useProgram(program);
  gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);

  gl.drawArrays(gl.TRIANGLES, 0, positions.length);

};
