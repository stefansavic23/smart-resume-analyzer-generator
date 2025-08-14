import React, { useRef, useState } from "react"
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import axios from "axios"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


const RegisterLogin = (props) => {
    const [email, setEmailValue] = useState('')
    const [password, setPasswordValue] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        const user = { email, password }
        console.log(user);

        await axios.post("http://localhost:3000/register", {
            email: JSON.stringify(email),
            password: JSON.stringify(password)
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
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
                <form maxWidth={"md"} spacing={4} onSubmit={handleSubmit}>
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
