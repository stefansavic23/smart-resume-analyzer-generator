import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default function ResumeLoader({ isLoading, finished }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading) return;

    setProgress(0); 

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 90) {
          return oldProgress; 
        }
        return Math.min(oldProgress + 5, 90);
      });
    }, 400);

    return () => clearInterval(timer);
  }, [isLoading]);

  React.useEffect(() => {
    if (finished) {
      setProgress(100);
    }
  }, [finished]);

  if (!isLoading) return null; 

  return (
    <Box sx={{ width: "300px", mt: 2 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {progress}%
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
