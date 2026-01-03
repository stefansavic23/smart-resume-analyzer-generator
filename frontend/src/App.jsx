import './App.css'
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

function App() {
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
                variant='h4'
                component="h1"
                sx={{
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' }
                }}
              >
                Welcome!
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='body1'
                sx={{
                  mb: 2,
                  px: { xs: 2, sm: 0 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                To analyze your resume you need to login or register
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
                  href='/login'
                  underline='none'
                  sx={{
                    margin: { xs: '8px', sm: '10px' },
                    display: 'inline-block'
                  }}
                >
                  Login
                </Link>
                or
                <Link
                  href='/register'
                  underline='none'
                  sx={{
                    margin: { xs: '8px', sm: '10px' },
                    display: 'inline-block'
                  }}
                >
                  Register
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
