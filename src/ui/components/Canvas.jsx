import React, { useRef, useEffect } from 'react';
import { vertexShader, fragmentShader } from './shaders';
import { createShader } from './createShader';
import { createProgram } from './createProgram';
import { createBuffer } from './createBuffer';
import styles from '../styles/App.module.css';

const setBackgroundColor = ({ gl, color: [r, g, b, a = 1] }) => {
  gl.clearColor(r / 255, g / 255, b / 255, a);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

const draw = canvas => {
  const gl = canvas.getContext('webgl2');

  setBackgroundColor({ gl, color: [225, 225, 225] });

  const vertex = createShader({ gl, type: 'vertex', text: vertexShader });
  const fragment = createShader({ gl, type: 'fragment', text: fragmentShader });
  const program = createProgram({ gl, shaders: [vertex, fragment] });

  createBuffer({ gl, program });
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

export const Canvas = () => {
  const canvas = useRef(null);

  useEffect(() => {
    draw(canvas.current);
  }, []);

  return <canvas ref={canvas} height="1196.09px" width="1783.8px" className={styles.canvas} />;
};
