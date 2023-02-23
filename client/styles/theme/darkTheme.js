import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#282828",
        },
        secondary: {
            main: "#fff",
        }
    },
});

export default darkTheme;