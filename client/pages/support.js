import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import HeaderComponent from '../components/appbar'
import { useState, useEffect } from 'react'

export default function Support() {
    const [urlChange, setUrlChange] = useState("")
    const [csrfToken, setCsrfToken] = useState("")

    const getCSRFToken = () => {
        fetch('http://localhost:5000/api/csrf-token')
            .then(response => response.json())
            .then(data => {
                setCsrfToken(data['CSRFToken'])
            })
    }

    useEffect(() => {
        getCSRFToken()
    }, [])

    const handleSubmit = () => {
        fetch('http://localhost:5000/api/support', {
            method: 'POST', credentials: "include", headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': csrfToken
            }, body: JSON.stringify({
                url: urlChange
            })
        }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleTextFieldChange = (event) => {
        setUrlChange(event.target.value);
    };

    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <HeaderComponent />
            <Box mt={10}>
                <Container height="100vh">
                    <Box mb={4}>
                        <Typography style={{ fontFamily: 'Ubuntu' }} variant="h2">Support</Typography>
                    </Box>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid container spacing={3}>
                            <Typography style={{ fontFamily: 'Ubuntu' }}>Thank you for reaching out to us. We're always here to help and are happy to receive your message. Before allowing us to host your website our support team needs to approve it. Enter your website URL in the textbox below and our support team will check it out.</Typography>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid item sx={4}>
                                    <form
                                        id="contact-form"
                                    >

                                        <Grid item sx={4}>
                                            <TextField
                                                fullWidth
                                                label="http://10.10.10.10"
                                                margin="normal"
                                                onChange={handleTextFieldChange}
                                            />
                                        </Grid>
                                        <Grid item sx={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={() => handleSubmit()}
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </>

    );
}

