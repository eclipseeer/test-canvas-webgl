import React, { useState, useRef, useEffect } from 'react';
import { init } from './init';
import { render } from './render';
import styles from '../styles/App.module.css';

export const Canvas = () => {
  const [isDragged, setIsDragged] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
  const canvas = useRef(null);
  const callback = useRef(() => {});
  const translate = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const { gl, program, positions, u_resolution, u_translate } = init(canvas.current);

    callback.current = () =>
      render(gl, program, positions, translate.current, u_resolution, u_translate);

    requestAnimationFrame(callback.current);
  }, []);

  const onMouseDown = e => {
    setIsDragged(true);
    setCoords([e.clientX, e.clientY]);
  };

  const onMouseMove = e => {
    if (!isDragged) return;
    translate.current.x = e.clientX - coords[0];
    translate.current.y = e.clientY - coords[1];
    requestAnimationFrame(callback.current);
  };

  const onMouseUp = e => {
    setIsDragged(false);
    // setCoords([0, 0]);
  };
  console.log('render');
  return (
    <canvas
      ref={canvas}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className={styles.canvas}
    />
  );
};
