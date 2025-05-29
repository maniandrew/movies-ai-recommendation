// src/router/index.tsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/Register'));

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
