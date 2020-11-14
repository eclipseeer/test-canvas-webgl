/*eslint-disable*/
import React, { useRef, useState, useEffect, useMemo, memo } from 'react';
import { Canvas } from './Canvas';
import styles from '../styles/App.module.css';

export const App = () => {
  return (
    <div className={styles.container}>
      <Canvas />
    </div>
  );
};



