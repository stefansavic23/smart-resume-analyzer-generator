import React, { use } from "react"
import ReactMarkdown from 'react-markdown'
import "../App.css"
import { useNavigate } from "react-router-dom";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from '@mui/material/Alert';


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
    const [aiResume, setAiResume] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleResumeChange = (e) => {
        setSelectedResume(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault()

        if (jobDescription === '') {
            return setErrorMessage("Enter your job description")
        }

        if (!selectedResume) {
            return setErrorMessage("Select your resume file")
        }

        const formData = new FormData()
        formData.append('resume', selectedResume)
        formData.append('jobDescription', jobDescription)

        try {
            const accessToken = localStorage.getItem("accessToken")

            setErrorMessage(null)
            setIsLoading(false)

            const response = await axios.post('http://localhost:3000/analyze-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            setIsLoading(true)
            setAiResume(response.data.message)
            console.log("File upload successfully")


        } catch (error) {
            if (error.status !== 403) {
                return setErrorMessage("Error uploading resume")
            }

            setErrorMessage("First login or register to analyze your resume")
            navigate("/")
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
                    {errorMessage && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Stack>)
                    }
                    <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                        <TextField
                            onChange={(event) => setJobDescription(event.target.value)}
                            id="standard-basic"
                            label="Job Description"
                            variant="standard"
                            required={true}
                        />
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
                            <Stack direction="row" spacing={2}>
                                <Button id="analyzeBtn" variant="text" type="submit">Analyze</Button>
                            </Stack>
                            : <Stack direction="row">
                                <Button loading variant="outlined" id="loadingBtn">
                                    Submit
                                </Button>
                            </Stack>
                        }
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="center">
                        {aiResume && (
                            <Card sx={{ mt: 2, maxWidth: "600px", maxHeight: "400px", overflowY: "auto" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        AI Resume Analysis
                                    </Typography>
                                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                                        {aiResume}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </form>
            </Box>
        </ThemeProvider>
    )
}

export default ResumeUpload