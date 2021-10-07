import { ThemeProvider, createTheme } from "@mui/material/styles";
import { customTheme } from './muiTheme'
import TrunkRoutes from "./components/core/TrunkRoutes";

const theme = createTheme(customTheme)


function App() {
  return (
    <ThemeProvider theme={theme}>

      <TrunkRoutes />

    </ThemeProvider>
  );
}

export default App;
