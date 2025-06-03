/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import registerService from '../../services/register/RegisterService';
import { useNavigate } from 'react-router-dom';

interface RegisterResponse {
  message: string;
  status_code: number;
}

interface Props {
  onRegisterResult: (response: RegisterResponse) => void;
  userName: string;
}

const WebCameraComponent: React.FC<Props> = ({ onRegisterResult, userName }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const streamRef = useRef<MediaStream | null>(null);
  
  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
  };

  const captureAndSend = async () => {
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
        const response = await registerService.registerFace(formData);
        onRegisterResult(response);
        stopStream();
        if (response.status_code === 200) {
          navigate('/');
        }
      } catch (error: any) {
        onRegisterResult(error?.response?.data)
        captureAndSend()
      }
    }, 'image/jpeg');
  };

  useEffect(() => {
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

    return () => {
      stopStream();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '720px', borderRadius: '10px' }}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
};

export default WebCameraComponent;
