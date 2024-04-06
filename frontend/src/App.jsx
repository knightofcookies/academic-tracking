import { AppBar } from "@mui/material";
import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar";

function App() {
  const { user } = useLoaderData();
  return (
  <>
    <ButtonAppBar />
    <Container>
        <p>Hello, {user?.username}</p>
        <p>This site is under construction.</p>
    </Container>
  </>
  );
}

export default App;
