import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./question.css";


export default function Question() {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        if (counter > 0) {
            const interval = setInterval(() => {
                setCounter((counter) => counter - 1);
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [counter]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
          navigate('/login');
        }
      },[]);

    return (
        <div>{counter}</div>
    )
}