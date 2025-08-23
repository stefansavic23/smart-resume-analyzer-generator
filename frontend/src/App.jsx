import './App.css'
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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Grid justifyItems={'center'}>
          <Typography variant='h4'>
            Welcome!
          </Typography>
          <Typography variant='body1'>
            To analyze your resume you need to login or register
          </Typography>
          <Typography variant='body1'>
            <Link href='/login' underline='none' sx={{margin:'10px'}}>
              Login
            </Link>
            or 
            <Link href='/register' underline='none' sx={{margin: '10px'}}>
              Register
            </Link>
          </Typography>

        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
