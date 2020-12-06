const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

const vsGLSL1 = `
  attribute vec4 position;

  void main() {
    gl_Position = position;
    gl_PointSize = 10.0;
  }
`;

const fsGLSL1 = `
  precision highp float;
  uniform vec4 color;
  void main() {
    gl_FragColor = color;
  }
`;

const vsGLSL2 = `
  attribute vec4 position;
  attribute vec4 color;
  varying vec4 v_color;
  void main() {
    gl_Position = position;
    gl_PointSize = 10.0;
    v_color = color;
  }
`;

const fsGLSL2 = `
  precision highp float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;

const createShader = function(gl, type, glsl) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, glsl)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader))
  }
  return shader
};

const compileShadersAndLinkProgram = function(gl, prg, vsGLSL, fsGLSL) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsGLSL)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsGLSL)
  gl.attachShader(prg, vertexShader)
  gl.attachShader(prg, fragmentShader)
  gl.linkProgram(prg)
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(prg))
  }
  // NOTE! These are only here to unclutter the diagram.
  // It is safe to detach and delete shaders once
  // a program is linked though it is arguably not common.
  // and I usually don't do it.
  gl.detachShader(prg, vertexShader)
  gl.deleteShader(vertexShader)
  gl.detachShader(prg, fragmentShader)
  gl.deleteShader(fragmentShader)
  return prg
};

// program 1 uses 1 attribute and 1 uniform

const prog1 = gl.createProgram();
compileShadersAndLinkProgram(gl, prog1, vsGLSL1, fsGLSL1);
const prog1Locs = {
  position: gl.getAttribLocation(prog1, 'position'),
  color: gl.getUniformLocation(prog1, 'color'),
};

// program 2 uses 2 attributes and no uniforms
const prog2 = gl.createProgram();
compileShadersAndLinkProgram(gl, prog2, vsGLSL2, fsGLSL2);
const prog2Locs = {
  position: gl.getAttribLocation(prog2, 'position'),
  color: gl.getAttribLocation(prog2, 'color'),
};

// vertex positions for a  ⃟
const prog1VertexPositions = new Float32Array([
  -0.2,  0,
  -0.8,  0,
  -0.3, -0.2,
  -0.7, -0.2,
  -0.3,  0.2,
  -0.7,  0.2,
  -0.4,  0.4,
  -0.6,  0.4,
  -0.4, -0.4,
  -0.6, -0.4,
  -0.5,  0.6,
  -0.5, -0.6,
]);

// vertex positions for a +
const prog2VertexPositions = new Float32Array([
  0.5,  0,
  0.5, -0.2,
  0.5,  0.2,
  0.5, -0.4,
  0.5,  0.4,
  0.4,  0,
  0.6,  0,
  0.3,  0,
  0.7,  0,
]);

const prog2VertexColors = new Float32Array([
  1, 0, 0,  // red
  0, 0, 1,  // blue
  0, 0, 1,
  0, 1, 0,  // green
  0, 1, 0,
  0, 1, 1,  // cyan
  0, 1, 1,
  1, 0, 1,  // magenta
  1, 0, 1,
]);

const position1Buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position1Buffer);
gl.bufferData(gl.ARRAY_BUFFER, prog1VertexPositions, gl.STATIC_DRAW);

const position2Buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position2Buffer);
gl.bufferData(gl.ARRAY_BUFFER, prog2VertexPositions, gl.STATIC_DRAW);

const color2Buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, color2Buffer);
gl.bufferData(gl.ARRAY_BUFFER, prog2VertexColors, gl.STATIC_DRAW);

// above this line is initialization code
// --------------------------------------
// below is rendering code.

// --------------------------------------
// First draw a diamond of points with the first program

// set the attributes to what's needed for program 1
gl.bindBuffer(gl.ARRAY_BUFFER, position1Buffer);
gl.enableVertexAttribArray(prog1Locs.position);
gl.vertexAttribPointer(
  prog1Locs.position, // location
  2,                  // size (components per iteration)
  gl.FLOAT,           // type of to get from buffer
  false,              // normalize
  0,                  // stride (bytes to advance each iteration)
  0,                  // offset (bytes from start of buffer)
);

gl.useProgram(prog1);

// orange
gl.uniform4fv(prog1Locs.color, [1, 0.7, 0.5, 1]);

// draw 12 points
gl.drawArrays(gl.POINTS, 0, 12);


// --------------------------------------
// Second, draw a plus of points with the second program

// set the attributes to what's needed for program 1
gl.bindBuffer(gl.ARRAY_BUFFER, position2Buffer);
gl.enableVertexAttribArray(prog2Locs.position);
gl.vertexAttribPointer(
  prog2Locs.position, // location
  2,                  // size (components per iteration)
  gl.FLOAT,           // type of to get from buffer
  false,              // normalize
  0,                  // stride (bytes to advance each iteration)
  0,                  // offset (bytes from start of buffer)
);

gl.bindBuffer(gl.ARRAY_BUFFER, color2Buffer);
gl.enableVertexAttribArray(prog2Locs.color);
gl.vertexAttribPointer(
  prog2Locs.color,    // location
  3,                  // size (components per iteration)
  gl.FLOAT,           // type of to get from buffer
  false,              // normalize
  0,                  // stride (bytes to advance each iteration)
  0,                  // offset (bytes from start of buffer)
);

gl.useProgram(prog2);

// draw 9 points
gl.drawArrays(gl.POINTS, 0, 9);
