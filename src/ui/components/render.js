export const render = (gl, program, positions, coords, u_resolution, u_translate) => {
  // console.log(coords);


  // console.log(gl.getParameter(gl.VIEWPORT));

  gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
  gl.uniform2f(u_translate, coords.x, coords.y);

  gl.clearColor(115 / 255, 90 / 255, 200 / 255, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length);
};
