import { Container } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Analytics from "./components/Analytics";
import './App.css';

function App() {
  const { user } = useLoaderData();
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <div className="container-app">
        <Analytics />
      </div>
    </div>
  );
}

export default App;
