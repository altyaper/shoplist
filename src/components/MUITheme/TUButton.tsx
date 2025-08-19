import { Button } from '@mui/material';
import { styled as MUIStyled } from '@mui/material/styles';

const BaseButton = MUIStyled(Button)(() => ({
  color: '#23242A'
}));

export const TUButton = (props: any) => {
  return (
    <BaseButton {...props} />
  )
}

export default TUButton;