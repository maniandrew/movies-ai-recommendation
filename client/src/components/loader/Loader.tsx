// src/components/Loader.tsx
import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.customLoaderWrapper}>
      <div className={styles.customSpinner}></div>
      <p className={styles.customLoaderText}>Loading...</p>
    </div>
  );
};

export default Loader;
