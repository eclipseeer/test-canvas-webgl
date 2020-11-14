export const createShader = (gl, type, glsl) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, glsl);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader));

  return shader;
};
