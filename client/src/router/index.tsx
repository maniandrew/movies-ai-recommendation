// src/router/index.tsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import FaceScanner from '../pages/faceScanner/FaceScanner';
import Home from '../pages/home/Home'

const Welcome = lazy(() => import('../components/welcome/Welcome'));
const Register = lazy(() => import('../pages/register/Register'));
const Login = lazy(() => import('../pages/login/Login'));

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loader customSize={100}/>}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register isLogin={false} />} />
        <Route path="/face-scanner" element={<FaceScanner />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
