import React from 'react';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { CssBaselineProps } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import * as ChatApi from './ChatsApi';

// Dummy Login ca sa imi mearga mie chat-ul; Sa le schimbati
export default function ChatDummyLogin() {
    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const jsonPayload = {
            "username": data.get('username'),
            "password": data.get('password')
        };

        console.log(jsonPayload);


        axios.post(ChatApi.DUMMY_AUTH, jsonPayload).then(
            (response) => {

                console.log(response);
                if (response.status === 400)
                    console.log("Login failed!");

                else if (response.status === 200) {
                    console.log("Login succeded!");
                    const userData = response.data;
                    console.log(userData);

                    localStorage.setItem("user", JSON.stringify(userData));
                    navigate("/chat");
                }
            }
        );
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://d1iiooxwdowqwr.cloudfront.net/pub/appsubmissions/20190806153212_icon.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                inputProps={{ pattern: "[a-zA-Z0-9]+" }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputProps={{ pattern: "[a-zA-Z0-9!@#$%]+" }}
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
                </Grid>
            </Grid>
    );
}

