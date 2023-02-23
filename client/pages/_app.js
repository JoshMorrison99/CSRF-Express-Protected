import '@/styles/globals.css'
import darkTheme from "../styles/theme/darkTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import '../styles/fonts.css';

export default function App({ Component, pageProps }) {
  return (<>
    <Head>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <title>CSRF Lab</title>
    </Head>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>)
}
