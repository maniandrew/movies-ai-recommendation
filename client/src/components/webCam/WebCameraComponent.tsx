/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import registerService, { type LoginResponse } from '../../services/register/RegisterService';
import styles from './WebCamera.module.css';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap'

interface RegisterResponse {
  message: string;
  status_code: number;
}

interface Props {
  onRegisterResult: (response: RegisterResponse) => void;
  userName: string;
  isFaceScan: boolean;
  imageFile: File;
  isLogin: boolean;
}

const WebCameraComponent: React.FC<Props> = (
  { onRegisterResult, userName, isFaceScan, imageFile, isLogin }
) => {
  console.log(isLogin, 'isLogin');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoader, setLoader] = useState<boolean>(false);
  const retryCount = useRef(0);


  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const captureAndSend = async () => {
    if (isLoader) return;
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], `snapshot-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', userName);

      try {
        retryCount.current += 1;
        let response: LoginResponse | RegisterResponse;
        if (isLogin) {
          response = await registerService.loginFace(formData)
        } else {
          response = await registerService.registerFace(formData);
        }
        await delay(1000);
        onRegisterResult(response);
        stopStream();
        if (response.status_code === 200) {
          setLoader(true);
          await delay(1000);
          setLoader(false);
          navigate(isLogin ? '/' : '/login');
        }
      } catch (error: any) {
        if (retryCount.current < 4) {
          onRegisterResult(error?.response?.data)
          captureAndSend()
        } else {
          stopStream();
          // navigate('/')
        }
      }
    }, 'image/jpeg');
  };

  const activateImageScanProcess = async () => {
    try {
      retryCount.current += 1;
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('name', userName);
      let response: LoginResponse | RegisterResponse;
      if (isLogin) {
        response = await registerService.loginFace(formData)
      } else {
        response = await registerService.registerFace(formData);
      }
      await delay(1000);
      onRegisterResult(response);
      if (response.status_code === 200) {
        setLoader(true);
        await delay(1000);
        setLoader(false);
        navigate(isLogin ? '/' : '/login');
      }
    } catch (error: any) {
      if (retryCount.current < 4) {
        onRegisterResult(error?.response?.data)
        activateImageScanProcess();
      }else {
        // navigate('/')
      }
    }
  }


  useEffect(() => {
    if (isFaceScan) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().then(() => {
                setTimeout(captureAndSend, 500); // Give the camera half a second to warm up
              });
            };
          }
        })
        .catch((err) => {
          console.error('Could not open webcam:', err);
        });
    } else {
      console.log(imageFile.name, 'imageFile');
      activateImageScanProcess();
    }
    return () => {
      if (isFaceScan) stopStream();
    };
  }, []);

  return (
    <React.Fragment>
      {isLoader ? (
        <div className={styles.loaderContainer}>
          <Loader customSize={100} />
        </div>
      )
        : (
          <div className={styles.cameraContainerContent}>
            {isFaceScan ?
              <video
                ref={videoRef}
                style={{ width: '100%', maxWidth: '720px', borderRadius: '10px' }}
                autoPlay
                muted
                playsInline
                className={styles.cameraVideo}
              /> :
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Home Banner"
                fluid
                rounded
                style={{ height: '100%', width: '100%' }}
              ></Image>
            }
            <div className={styles.greenLine} />
          </div>
        )
      }
    </React.Fragment>

  );
};

export default WebCameraComponent;
