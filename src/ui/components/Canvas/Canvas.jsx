import React, { useState, useRef, useEffect } from 'react';
import { init } from '../../../webgl/init';
import { render } from '../../../webgl/render';
import { getMouseCoords } from '../../../webgl/getMouseCoords';
import { getSelectedRectangle } from '../../../webgl/getSelectedRectangle';
import styles from './Canvas.module.css';

export const Canvas = () => {
  const [isDragged, setIsDragged] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
  const canvas = useRef(null);
  const callback = useRef(() => {});
  const translate = useRef({ x: 0, y: 0 });
  const selectedId = useRef(-1);

  useEffect(() => {
    const { gl, program, positions, uniforms } = init(canvas.current);

    callback.current = () =>
      render(
        gl,
        program,
        {
          coords: translate.current,
          positions,
          u_selectedId: selectedId.current,
        },
        uniforms,
      );

    requestAnimationFrame(callback.current);
  }, []);

  const onMouseDown = e => {
    setIsDragged(true);
    setCoords([e.clientX, e.clientY]);
  };

  const onMouseMove = e => {
    selectedId.current = getSelectedRectangle(getMouseCoords(e, canvas.current));

    if (isDragged) {
      translate.current.x = e.clientX - coords[0];
      translate.current.y = e.clientY - coords[1];
    }

    requestAnimationFrame(callback.current);
  };

  const onMouseUp = () => {
    setIsDragged(false);
  };

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
