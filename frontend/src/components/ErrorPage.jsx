import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouteError, Link as RouterLink } from "react-router-dom";
import CustomThemeProvider from "./CustomThemeProvider";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <CustomThemeProvider>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    minHeight: "100vh",
                    backgroundColor: "primary",
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Oops!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography variant="overline" gutterBottom>
                    Error : {error.statusText || error.message}
                </Typography>
                <Button variant="contained" component={RouterLink} to="/">
                    Home
                </Button>
            </Box>
        </CustomThemeProvider>
    );
}