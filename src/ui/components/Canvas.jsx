import React, { useRef, useEffect } from 'react';
import { init } from './init';
import { render } from './render';
import styles from '../styles/App.module.css';


export const Canvas = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const { gl, program, positions } = init(canvas.current);
    render(gl, program, positions);
  }, []);

  return <canvas ref={canvas} className={styles.canvas} />;
};
