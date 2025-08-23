import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const NotFoundPage = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth='sm'>
                <Grid justifyItems={'center'}>
                    <Typography variant="h4">
                        Page Not Found
                    </Typography>
                    <Typography variant='body1'>
                        <Link href='/' underline='none'>
                            Go back Home
                        </Link>
                    </Typography>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default NotFoundPage