import React from "react"
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

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
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container maxWidth={"md"} spacing={2}>
                    <Grid size={8} display="flex" justifyContent="center" alignItems="center">
                        <Item>size=8</Item>
                    </Grid>
                    <Grid size={4} display="flex" justifyContent="center" alignItems="center" size="grow">
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={4} display="flex" justifyContent="center" alignItems="center" size="grow">
                        <Item>size=4</Item>
                    </Grid>
                    <Grid size={8} display="flex" justifyContent="center" alignItems="center" size="grow">
                        <Item>size=8</Item>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default RegisterLogin

