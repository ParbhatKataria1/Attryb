import React from 'react'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/auth/login')
    }
  return (
    <>{children}</>
  )
}

export default PrivateRoute