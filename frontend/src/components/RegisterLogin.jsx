import { useState } from "react"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const RegisterLogin = (props) => {
    const navigate = useNavigate()

    const [email, setEmailValue] = useState('')
    const [password, setPasswordValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:3000/api/v1${props.action}`, {
                email: email,
                password: password
            })

            localStorage.setItem("accessToken", response.data.accessToken)
            console.log(response)
            navigate("/analyze-resume")
        } catch (error) {
            setErrorMessage("Invalid email or password")
            console.log(error)
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box justifyItems={"center"}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                <form spacing={4} onSubmit={handleSubmit}>
                    {errorMessage && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Stack>)
                    }
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField value={email}
                            onChange={(event) => setEmailValue(event.target.value)}
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            required={true}
                        />
                    </Grid>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField
                            value={password}
                            onChange={(event) => setPasswordValue(event.target.value)}
                            type="password"
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            required={true}
                            error={password.length > 0 &&
                                (
                                    password.length < 8 ||
                                    password.length > 64 ||
                                    !/[A-Z]/.test(password) ||
                                    !/[a-z]/.test(password) ||
                                    /\s/.test(password)
                                )}
                            helperText={
                                password.length > 0
                                    ? password.length < 8
                                        ? "Password must be at least 8 characters"
                                        : password.length > 64
                                            ? "Password must be less than 64 characters"
                                            : !/[A-Z]/.test(password)
                                                ? "Password must contain at least 1 uppercase letter"
                                                : !/[a-z]/.test(password)
                                                    ? "Password must contain at least 1 lowercase letter"
                                                    : /\s/.test(password)
                                                        ? "Password must not contain spaces"
                                                        : ""
                                    : ""
                            }
                        />
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
