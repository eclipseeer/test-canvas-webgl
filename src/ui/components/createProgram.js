export const createProgram = ({ gl, shaders = [] }) => {
  const program = gl.createProgram();

  shaders.forEach(shader => {
    gl.attachShader(program, shader);
  });

  gl.linkProgram(program);

  return program;
};
