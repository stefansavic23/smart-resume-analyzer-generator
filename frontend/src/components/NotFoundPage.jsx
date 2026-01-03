import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const NotFoundPage = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container
                maxWidth='sm'
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    py: { xs: 4, sm: 6, md: 8 }
                }}
            >
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    mb: 3,
                                    fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' }
                                }}
                            >
                                Page Not Found
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography
                                variant='body1'
                                sx={{
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                            >
                                <Link
                                    href='/'
                                    underline='none'
                                    sx={{
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    Go back Home
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default NotFoundPage