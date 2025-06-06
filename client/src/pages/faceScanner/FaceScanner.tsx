import React  from 'react'
import styles from './FaceScanner.module.css';
import { Container } from 'react-bootstrap';
import '../../assets/styles/global.css';
import WebCameraComponent from '../../components/webCam/WebCameraComponent';
import { useLocation } from 'react-router-dom'


const FaceScanner: React.FC = () => {
    const location = useLocation();
    const userName: string = location.state?.userName;
    const isFaceScan: boolean = location.state?.isFaceScan;
    const imageFile: File = location.state?.fileDetails;
    const isLogin: boolean = location.state?.isLogin;

    return (
        <Container className={styles.faceScannerContainer}>
            <div className={styles.cameraWrapper}>
                <WebCameraComponent 
                   isFaceScan={isFaceScan} 
                   userName={userName}
                   imageFile={imageFile}
                   isLogin={isLogin}
                ></WebCameraComponent>
            </div>
        </Container>
    )
}

export default FaceScanner