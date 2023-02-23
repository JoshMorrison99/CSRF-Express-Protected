import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function HeaderComponent() {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} style={{ fontFamily: 'Ubuntu' }}>
                    Bounty Hosting
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/features"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Features
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/profile"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Profile
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/support"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </Link>
                </nav>
                <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5, color: 'white' }}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    )
}