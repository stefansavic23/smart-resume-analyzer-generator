import React from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const RegisterLogin = (props) => {
    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container maxWidth='sm'>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            defaultValue=""
                        /> <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Grid display="flex" justifyContent="center" alignItems="center">
                        <Button variant="text">{props.btn}</Button>
                    </Grid>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default RegisterLogin

