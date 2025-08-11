import React, { useRef, useState } from "react"
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

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
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box justifyItems={"center"}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>

                <Grid container maxWidth={"md"} spacing={2}>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField value={emailValue} onChange={(event) => setEmailValue(event.target.value)} id="standard-basic" name="email" label="Email" variant="standard" />
                    </Grid>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField value={passwordValue} onChange={(event) => setPasswordValue(event.target.value)} type="password" id="standard-basic" label="Password" variant="standard" />
                    </Grid>
                    <Grid size={12} display={"flex"} justifyContent={"center"}>
                        <Button variant="text" type="submit">{props.btn}</Button>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default RegisterLogin

