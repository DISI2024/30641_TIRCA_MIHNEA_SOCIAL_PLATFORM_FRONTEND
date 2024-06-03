import React, {useState} from 'react';
import {Avatar} from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useIsLoggedIn} from "../../../redux/slices/security/selectors";
import {useAppDispatch} from "../../../redux/slices/security/hooks";
import {authenticate} from "../../../redux/slices/security/securitySlice";

const defaultCredentials = {
    identifier: '',
    password: ''
}

export default function Login() {

    const navigate = useNavigate();
    const isLoggedIn = useIsLoggedIn()

    if (isLoggedIn) {
        navigate('/home');
    }

    const dispatch = useAppDispatch();
    const [credentials, setCredentials] = useState(defaultCredentials);

    const handleUsernameChange = (event) => {
        setCredentials({
            ...credentials,
            identifier: event.target.value
        });
    }

    const handlePasswordChange = (event) => {
        setCredentials({
            ...credentials,
            password: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(authenticate(credentials));
        setCredentials(defaultCredentials);
    }

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username or Email"
                            name="username"
                            autoFocus
                            inputProps={{pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9]+$"}}
                            onChange={handleUsernameChange}
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
                            inputProps={{pattern: "[a-zA-Z0-9!@#$%]+"}}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{mt: 2, mb: 2}}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

