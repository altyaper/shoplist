import { ThemeProvider } from "@mui/material";
import { theme } from '../../themes/theme';

export const withThemeProvider = (Story: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
}