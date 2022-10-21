import { MuiButtonBase } from './overrides/button';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#C39AEF',
      main: '#A362EA',
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h2: {
      fontSize: '3em',
      fontWeight: 'bold',
      lineHeight: '1.2em',
    }
  },
  components: {
    MuiButtonBase,
  }
});