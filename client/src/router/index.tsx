// src/router/index.tsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/loader/Loader';

const Home = lazy(() => import('../components/welcome/Home'));
const Register = lazy(() => import('../components/register/Register'));

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
