import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import ResumeLoader from "../components/ResumeLoader";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import SimpleAlert from "./simpleAlert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ResumeUpload = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [aiResume, setAiResume] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleResumeChange = (e) => {
    setSelectedResume(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (jobDescription === "") {
      return setErrorMessage("Enter your job description");
    }

    if (!selectedResume) {
      return setErrorMessage("Select your resume file");
    }

    setIsLoading(true);
    setFinished(false);

    const formData = new FormData();
    formData.append("resume", selectedResume);
    formData.append("jobDescription", jobDescription);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:3000/api/v1/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFinished(true);
      setAiResume(response.data.message);

      setTimeout(() => {
        setIsLoading(false);
      }, 500)
      console.log("File upload successfully");
    } catch (error) {
      if (error.response?.status !== 403) {
        return setErrorMessage("Error uploading resume");
      }
      setIsLoading(false);
      setErrorMessage("First login or register to analyze your resume");
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          minHeight: '100vh',
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
            Upload your resume
          </Typography>
          <form onSubmit={handleUpload}>
            <Grid container spacing={3}>
              {errorMessage && (
                <Grid size={{ xs: 12 }}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Stack>
                </Grid>
              )}

              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  onChange={(event) => setJobDescription(event.target.value)}
                  id="job-description"
                  label="Job Description"
                  variant="outlined"
                  required={true}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12 }}>
                <Box sx={{
                  display: "flex",
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2
                }}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    size="large"
                    sx={{
                      minWidth: { xs: '100%', sm: 'auto' },
                      py: 1.5
                    }}
                  >
                    Upload resume
                    <VisuallyHiddenInput type="file" onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
                  </Button>
                  {selectedResume && (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: { xs: 'center', sm: 'left' },
                        wordBreak: 'break-word',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {selectedResume.name}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {!isLoading ? (
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      minWidth: { xs: '100%', sm: '200px' },
                      py: 1.5
                    }}
                  >
                    Analyze
                  </Button>
                ) : (
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <ResumeLoader isLoading={isLoading} finished={finished} />
                  </Box>
                )}
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
                {aiResume && (
                  <Card
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: { xs: '100%', sm: '600px', md: '700px' },
                      maxHeight: { xs: '300px', sm: '400px', md: '500px' },
                      overflowY: "auto",
                    }}
                  >
                    <CardContent>
                      <SimpleAlert message={"Resume analyzed successfully"} />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          mt: 2,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        AI Resume Analysis
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          whiteSpace: "pre-line",
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        {aiResume}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResumeUpload;