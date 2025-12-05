import { BrowserRouter, Routes, Route } from "react-router";
import UsersList from "./pages/UsersList";
import Layout from "./components/Layout";
import {
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import UserDetail from "./pages/UsersDetail";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route
              path="*"
              element={
                <Typography variant="h4" align="center" sx={{ mt: 5 }}>
                  404 | Página no encontrada
                </Typography>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
