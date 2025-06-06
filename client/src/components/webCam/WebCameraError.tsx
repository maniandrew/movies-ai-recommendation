import React from 'react';
import styles from './WebCamErrorComponent.module.css'; // Your CSS module
import {  Image } from 'react-bootstrap';
import '../../assets/styles/global.css';
import { useNavigate } from 'react-router-dom';

interface WebCamErrorProps {
  onRetry: () => void;
  errorMessage?: string;
  isLogin: boolean
}

const WebCamErrorComponent: React.FC<WebCamErrorProps> = ({
  onRetry,
  errorMessage = 'Webcam failed to start. Please try again.',
  isLogin
}) => {
  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(isLogin ? '/login' : '/register')
  }
  return (
    <div className={styles.errorContainer}>
      <Image
        src={'https://cdn-icons-png.flaticon.com/512/5951/5951476.png'} // Your error image path
        alt="Webcam error"
        fluid
        className={styles.errorImage}   
      />

      <p className={styles.errorText}>{errorMessage}</p>

      <div className={styles.actionContainer}>
        <button className="primary-button" onClick={onRetry}> Retry</button>
        <button className='secondary-button' onClick={goBack}>Back</button>
      </div>
      
    </div>
  );
};

export default WebCamErrorComponent;

