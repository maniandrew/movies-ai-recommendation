/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import registerService, { type LoginResponse } from '../../services/register/RegisterService';
import styles from './WebCamera.module.css';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import WebCamErrorComponent from './WebCameraError';

interface RegisterResponse {
  message: string;
  status_code: number;
  user?: Array<any>;
}

interface Props {
  userName: string;
  isFaceScan: boolean;
  imageFile: File;
  isLogin: boolean;
}

const WebCameraComponent: React.FC<Props> = (
  { userName, isFaceScan, imageFile, isLogin }
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoEnable, setVideoEnable] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [context, setContext] = useState<string>('Scanning your face...')
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
    setError(false)
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
        setContext(response.message);
        if (response.status_code === 200) {
          await delay(3000);
          stopStream();
          
          setLoader(true);
          await delay(1000)
          setLoader(false);
          if (isLogin) {
            navigate('/home', {
              state: {
                user: response.user
              }
            });
            return;
          } else {
            navigate('/login');
          }
        }
      } catch (error: any) {
        if (retryCount.current < 4) {
          setContext(error?.response?.data?.message)
          captureAndSend()
        } else {
          setError(true)
          stopStream();
          setVideoEnable(false)
        }
      }
    }, 'image/jpeg');
  };

  const activateImageScanProcess = async () => {
    try {
      setError(false)
      setVideoEnable(true)
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
      setContext(response.message);
      if (response.status_code === 200) {
        await delay(3000);
        setLoader(true);
        await delay(1000)
        setLoader(false)
        if (isLogin) {
          navigate('/home', {
            state: {
              user: response.user
            }
          });
          return;
        } else {
          navigate('/login');
        }
      }
    } catch (error: any) {
      if (retryCount.current < 4) {
        setContext(error?.response?.data?.message)
        activateImageScanProcess();
      } else {
        setError(true);
        setVideoEnable(false)
      }
    }
  }


  const playVideStream = (): void => {
    setVideoEnable(false);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => {
              setTimeout(() => {
                captureAndSend()
                setVideoEnable(true);
              }, 500); // Give the camera half a second to warm up
            });
          };
        }
      })
      .catch((err) => {
        console.error('Could not open webcam:', err);
      });
  }


  useEffect(() => {
    if (isFaceScan) {
      playVideStream()
    } else {
      activateImageScanProcess();
    }
    return () => {
      if (isFaceScan) stopStream();
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = async () => {
    if (isFaceScan) {
      playVideStream();
      await captureAndSend();
    } else {
      activateImageScanProcess()
    }
  };

  return (
    <React.Fragment>
      {isLoader ? (
        <div className={styles.loaderContainer}>
          <Loader customSize={100} />
        </div>
      )
        : (
          <>
            {isVideoEnable && <Container className={styles.cameraContainer}>
              <h3 className='primary'> {context}... </h3>
            </Container>}
            {!error && <div className={styles.cameraContainerContent}>
              {isFaceScan ?
                <video
                  ref={videoRef}
                  style={{ width: '100%', maxWidth: '720px', borderRadius: '10px' }}
                  autoPlay
                  muted
                  playsInline
                  className={styles.cameraVideo}
                /> :
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Home Banner"
                  className={styles.cameraImage}
                ></img>
              }
              {isVideoEnable && <div className={styles.greenLine} />}
            </div>}
            {error && 
            <Container>
              <WebCamErrorComponent
                onRetry={handleRetry}
                errorMessage={context ?? "Not able to process your authentication ,Please Retry"}
                isLogin = {isLogin}
              />
            </Container>}
          </>
        )
      }
    </React.Fragment>

  );
};

export default WebCameraComponent;
