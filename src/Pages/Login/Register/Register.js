import { Button, Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import login from '../../../images/login.png';
import useAuth from './../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const { user, registerUser, error, isLoading, authError } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert("Your password dit not match");
            return
        }
        // console.log(loginData)
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ mt: 8 }} item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Register</Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Your name"
                            name="name"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handleOnBlur}
                            type="email"
                            variant="standard" />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            name="password"
                            onBlur={handleOnBlur}
                            type="password"
                            variant="standard" />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Retype Your Password"
                            name="password2"
                            onBlur={handleOnBlur}
                            type="password"
                            variant="standard" />
                        <Button sx={{ width: "75%", m: 1 }} type="submit" variant="contained">Register</Button>
                        <NavLink style={{ textDecoration: "none" }} to="/login"><Button variant="text">Already Registered? Please Login</Button></NavLink>
                    </form>}
                    {isLoading && <CircularProgress color="secondary" />}
                    {user?.email && <Alert severity="success">User created successfully</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                    <Typography>{error}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Register;