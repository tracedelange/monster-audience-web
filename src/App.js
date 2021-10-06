import { ThemeProvider, createTheme } from "@mui/material/styles";
import { customTheme } from './muiTheme'
import LandingPage from './components/LandingPage.js'

const theme = createTheme(customTheme)


function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
