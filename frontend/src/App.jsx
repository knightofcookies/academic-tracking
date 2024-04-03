import AppBar from "./components/AppBar";
import Container from "@mui/material/Container";
import CustomThemeProvider from "./components/CustomThemeProvider";
import { useLoaderData } from "react-router-dom";

function App() {
  const { user } = useLoaderData();

  return (
    <CustomThemeProvider>
      <AppBar />
      <Container>
        <p>Hello, {user.username}</p>
        <p>This site is under construction.</p>
        {/* TODO Display home page text */}
      </Container>
    </CustomThemeProvider>
  );
}

export default App;
