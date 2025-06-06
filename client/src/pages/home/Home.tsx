import React from 'react'
import { useLocation } from 'react-router-dom'

const Home:React.FC = () => {
    const location = useLocation();
    const userName: string = location.state?.user?.name;
  return (
    <div>
        <h2 className='primary'> Welcome back: {userName }</h2>
    </div>
  )
}

export default Home