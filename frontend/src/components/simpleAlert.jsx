import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert(props) {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      {props.message}
    </Alert>
  );
}
