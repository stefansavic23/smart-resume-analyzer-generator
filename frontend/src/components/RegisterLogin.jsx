import { useState } from "react"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
            <Container
                maxWidth="sm"
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    py: { xs: 4, sm: 6, md: 8 }
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            mb: 4,
                            fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' }
                        }}
                    >
                        {props.title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {errorMessage && (
                                <Grid size={{ xs: 12 }}>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">{errorMessage}</Alert>
                                    </Stack>
                                </Grid>
                            )}
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField
                                    value={email}
                                    onChange={(event) => setEmailValue(event.target.value)}
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    required={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField
                                    value={password}
                                    onChange={(event) => setPasswordValue(event.target.value)}
                                    type="password"
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    required={true}
                                    fullWidth
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
                            <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    sx={{
                                        minWidth: { xs: '100%', sm: '200px' },
                                        py: 1.5
                                    }}
                                >
                                    {props.btn}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegisterLogin
