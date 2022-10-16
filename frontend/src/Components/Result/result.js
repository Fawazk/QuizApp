import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import './result.css'
import { MyContext } from '../../store'
import { sendEmail } from '../../apiCalls/axios'
import { sleep } from '../Sleep/sleep'


export default function Result() {

  const {totalQuestions,setTotalQuestions} = useContext(MyContext)
  const navigate = useNavigate()
  const mark = localStorage.getItem('mark');
  
  const sendmail=async()=>{
    let data = {
      'mark':mark,
      'totalQuestions':totalQuestions
    }
    sendEmail(data)
    await sleep(2000)
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <div className="result">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Box className="giftbox">
          <Typography color='black'>
          Congratulations your score {mark}/{totalQuestions}
          </Typography>
        </Box>
        <Box className="sendmail">
          <Typography color='black' onClick={() => { sendmail() }}>
            Email your score
          </Typography>
        </Box>
      </Grid>
    </div>
  )
}
