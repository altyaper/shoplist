import { Button } from '@mui/material';
import { styled as MUIStyled } from '@mui/material/styles';

const BaseButton = MUIStyled(Button)(({ theme }) => ({
  color: '#23242A'
}));

export const TUButton = (props) => {
  return (
    <BaseButton {...props} />
  )
}

export default TUButton;