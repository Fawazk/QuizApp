import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginSubmit } from '../../apiCalls/axios'
import { useNavigate } from 'react-router-dom';


const theme = createTheme();
export default function Login() {

    const [alerts, setAlert] = useState('');
    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('username') === '') {
            setAlert('username is required')
            console.log(alerts)
        }
        else if (data.get('password') === '') {
            setAlert('password feild is required')
            console.log(alerts)
        }
        else {
            const formdata = {}
            formdata.username = data.get('username')
            formdata.password = data.get('password')
            loginSubmit(formdata).then((authdata) => {
                localStorage.setItem('Token', authdata.token)
                navigate('/')
            })
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            navigate('/');
        }
        localStorage.setItem('mark', 0)
    }, []);

    return (
        <div>
            <ThemeProvider theme={theme}>
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"

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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}
