import React from "react"
import "../App.css"
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useState } from 'react';
import Stack from '@mui/material/Stack';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ResumeUpload = (props) => {
    const [selectedResume, setSelectedResume] = useState(null)
    const [jobDescription, setJobDescription] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const handleResumeChange = (e) => {
        setSelectedResume(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault()

        if (jobDescription === '') {
            return alert("Enter your job description!")
        }

        if (!selectedResume) {
            return alert('Select your resume first!')
        }

        const formData = new FormData()
        formData.append('resume', selectedResume)
        formData.append('jobDescription', jobDescription)

        try {
            setIsLoading(false)
            const response = await axios.post('http://localhost:3000/analyze-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setIsLoading(true)
            console.log("File upload successfully: ", response.data)
        } catch (error) {
            console.log("Error uploading file: ", error)
        }

    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box justifyItems={"center"}>
                <Typography variant="h4" gutterBottom>
                    Upload your resume
                </Typography>
                <form spacing={4} onSubmit={handleUpload}>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField onChange={(event) => setJobDescription(event.target.value)} id="standard-basic" label="Job Description" variant="standard" />
                    </Grid>
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <Button
                            component="label"
                            role={undefined}
                            id="uploadResumeBtn"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload resume
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleResumeChange}
                            />
                        </Button>
                    </Grid>
                    <Grid size={12} display={"flex"} justifyContent={"center"}>
                        {isLoading ?
                            <Button id="analyzeBtn" variant="text" type="submit">Analyze</Button>

                            : <Stack direction="row" spacing={2}>
                                <Button loading variant="outlined" id="loadingBtn">
                                    Submit
                                </Button>
                            </Stack>
                        }

                    </Grid>
                </form>
            </Box>
        </ThemeProvider>
    )
}

export default ResumeUpload