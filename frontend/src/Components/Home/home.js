import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './home.css'

export default function Home() {
  const navigate = useNavigate()

  

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      navigate('/login');
    }
    localStorage.setItem('mark', 0)
  }, []);

  return (
    <div className='home'>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3}>
          <Typography variant={'h1'} align={'center'} color={'white'}>
            WELCOME
          </Typography>
          <Button color="error" variant="contained" onClick={()=>{navigate('/question');}} >ENTER TO START QUIZ</Button>
        </Grid>

      </Grid>

    </div>
  )
}
