import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import HeaderComponent from '../components/appbar'
import { useState } from 'react'


export default function Profile() {
    const [newPasswordChange, setNewPasswordChange] = useState("")

    const handleTextFieldChange = (event) => {
        setNewPasswordChange(event.target.value);
    };

    const handleSubmit = () => {
        console.log(newPasswordChange)
        fetch('http://localhost:5000/api/reset_password', {
            method: 'POST', credentials: "include", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                password: newPasswordChange,
            })
        }
        )
            .then(response => response.json())
            .then(data => {
                if (data.status == "Password Updated") {
                    location.href = "/"
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <HeaderComponent />
            <Box mt={10}>
                <Container height="100vh">
                    <Box mb={4}>
                        <Typography style={{ fontFamily: 'Ubuntu' }} variant="h2">Profile</Typography>
                    </Box>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <form
                                id="contact-form"
                            >
                                <Typography style={{ fontFamily: 'Ubuntu' }} variant="h5">Reset Password</Typography>
                                <Grid item>
                                    <TextField
                                        fullWidth
                                        label="new password..."
                                        margin="normal"
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSubmit()}
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>

    );
}

