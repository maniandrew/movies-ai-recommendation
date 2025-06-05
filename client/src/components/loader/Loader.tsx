// src/components/Loader.tsx
import React, { useEffect, useState } from 'react';
import styles from './Loader.module.css';

type Props = {
  customSize: number;
}

const Loader: React.FC<Props> = ({customSize}) => {
  const [size , setSize] = useState<number>(50);
  useEffect(() => {
    setSize(customSize);
  },[customSize])
  return (
    <div className={styles.customLoaderWrapper}>
      <div className={styles.customSpinner} style={{height:size , width: size}}></div>
    </div>
  );
};

export default Loader;
