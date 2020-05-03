/*eslint-disable*/
import React, { useEffect, useRef } from 'react';
import styles from '../styles/App.module.css';
import a from './test.glsl';

export const App = () => {
  return (
    <div className={styles.container}>
      <canvas />
    </div>
  );
};
