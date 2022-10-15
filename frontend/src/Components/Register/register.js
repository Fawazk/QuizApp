import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {registerSubmit} from '../../apiCalls/axios'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();
export default function Register() {
    const [alerts,setAlert] = useState('');
    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('username')===''){
            setAlert('username is required')
            console.log(alerts)
        }
        else if (data.get('email')===''){
            setAlert('email is required')
            console.log(alerts)
        }
        else if(data.get('password')===''){
            setAlert('password feild is required')
            console.log(alerts)
        }
        else if(data.get('password2')===''){
            setAlert('Confirm password feild is required')
            console.log(alerts)
        }
        else if(data.get('password2')!== data.get('password')){
            setAlert('Both passwords are not same')
            console.log(alerts)
        }
        else{
        const formdata={}
        formdata.username = data.get('username')
        formdata.email= data.get('email')
        formdata.password= data.get('password')
        formdata.password2= data.get('password2')
        registerSubmit(formdata).then((authdata)=>{
            localStorage.setItem('token',authdata.token)
            // localStorage.setItem("user", JSON.stringify(authdata.username))
            navigate('/')
        })
      }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
          navigate('/');
        }
      },[]);

    return (
        <div><ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                         {alerts ? <Alert className="mb-3" severity="error">{alerts}</Alert> : ''}
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            id="password2"
                            
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </div>
    )
}
