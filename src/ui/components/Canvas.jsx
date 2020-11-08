import React, { useRef, useEffect } from 'react';
import { vertexShader, fragmentShader } from './shaders';
import { createShader } from './createShader';
import { createProgram } from './createProgram';
import { createBuffer } from './createBuffer';
import styles from '../styles/App.module.css';


const setBackgroundColor = ({ gl, color: [r, g, b, a = 1] }) => {
  gl.clearColor(r / 255, g / 255, b / 255, a);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

const draw = canvas => {
  const gl = canvas.getContext('webgl');
  canvas.width  = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  setBackgroundColor({ gl, color: [225, 225, 225] });

  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader );
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = createProgram({ gl, shaders: [vertex, fragment] });



  createBuffer({ gl, program });
};

export const Canvas = () => {
  const canvas = useRef(null);

  useEffect(() => {
    draw(canvas.current);
  }, []);

  return <canvas ref={canvas} className={styles.canvas} />;
};
