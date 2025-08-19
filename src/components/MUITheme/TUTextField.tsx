import { TextField } from '@mui/material';

export const TUTextField = (props: any) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      fullWidth
      InputLabelProps={{
        style: {
          fontSize: '1.2em'
        }
      }}
      inputProps={{
        style: {
          fontSize: '2em',
          lineHeight: '1.2em'
        }
      }}
      variant="standard"
      {...props}
    />
  )
}

export default TUTextField;