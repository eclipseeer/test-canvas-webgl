export const render = (gl, program, props, uniforms) => {
  const { coords, positions, u_selectedId } = props;

  gl.uniform2f(uniforms.u_resolution, gl.canvas.width, gl.canvas.height);
  gl.uniform2f(uniforms.u_translate, coords.x, coords.y);
  gl.uniform1f(uniforms.u_selectedId, u_selectedId);

  gl.clearColor(121 / 255, 85 / 255, 72 / 255, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length);
};
