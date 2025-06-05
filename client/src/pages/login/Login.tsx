import React from 'react'
import '../../assets/styles/global.css';
import Register from '../register/Register';

const Login:React.FC = () => {
  return (
    <Register isLogin={true}></Register>
  )
}

export default Login