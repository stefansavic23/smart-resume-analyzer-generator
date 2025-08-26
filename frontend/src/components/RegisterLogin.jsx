import React, { useState } from "react"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const RegisterLogin = (props) => {
    const navigate = useNavigate()

    const [email, setEmailValue] = useState('')
    const [password, setPasswordValue] = useState('')

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email === '') return alert("Enter your email address")
        if (validateEmail(email) == false) return alert("Invalid email address")
        if (password === '') return alert("Enter your password")

        await axios.post(`http://localhost:3000${props.action}`, {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken)
            navigate("/analyze-resume")
        }).catch((error) => {
            if (error.status == 404) {
                return alert("Email not found")
            } else if (error.status == 401) {
                return alert("Incorrect password")
            }

            console.log(error)
        })
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box justifyItems={"center"}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                <form spacing={4} onSubmit={handleSubmit}>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField value={email} onChange={(event) => setEmailValue(event.target.value)} id="standard-basic" label="Email" variant="standard" />
                    </Grid>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField value={password} onChange={(event) => setPasswordValue(event.target.value)} type="password" id="standard-basic" label="Password" variant="standard" />
                    </Grid>
                    <Grid size={12} display={"flex"} justifyContent={"center"}>
                        <Button variant="text" type="submit">{props.btn}</Button>
                    </Grid>
                </form>
            </Box>
        </ThemeProvider>
    )
}

export default RegisterLogin
