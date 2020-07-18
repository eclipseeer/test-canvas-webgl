export const createShader = ({ gl, type, text }) => {
  const types = {
    vertex: gl.VERTEX_SHADER,
    fragment: gl.FRAGMENT_SHADER,
  };

  const shader = gl.createShader(types[type]);

  gl.shaderSource(shader, text);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(`Cant compile ${type} shader`);

  return shader;
};
