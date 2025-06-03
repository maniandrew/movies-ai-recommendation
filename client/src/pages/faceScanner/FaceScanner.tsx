import React , { useState } from 'react'
import styles from './FaceScanner.module.css';
import { Container } from 'react-bootstrap';
import '../../assets/styles/global.css';
import WebCameraComponent from '../../components/webCam/WebCameraComponent';
import { useLocation } from 'react-router-dom'


const FaceScanner: React.FC = () => {

    const [ context , setContext ] = useState<string | null> ('Scanning your face...');

    const handleContext = (data: { message: string; status_code: number }): void => {
        setContext(data.message)
    }

    const location = useLocation();
    const userName = location.state?.userName;
     
    return (
        <Container className={styles.faceScannerContainer}>
            <Container className={styles.cameraContainer}>
                <h3 className='primary'> { context } </h3>
            </Container>
            <Container className={styles.cameraWrapper}>
                <WebCameraComponent onRegisterResult={handleContext} userName={userName}></WebCameraComponent>
            </Container>
        </Container>
    )
}

export default FaceScanner