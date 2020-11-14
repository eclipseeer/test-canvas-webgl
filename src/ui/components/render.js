export const render = (gl, program, positions) => {
  gl.useProgram(program);

  const a_position = gl.getAttribLocation(program, 'a_position');
  const u_resolution = gl.getUniformLocation(program, 'u_resolution');

  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  // console.log(gl.getParameter(gl.VIEWPORT));

  gl.uniform2fv(u_resolution, [gl.canvas.width, gl.canvas.height]);

  gl.drawArrays(gl.TRIANGLES, 0, positions.length);
};
