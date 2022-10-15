import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/login');
    }
  },[]);
  return (
    <div>result</div>
  )
}
