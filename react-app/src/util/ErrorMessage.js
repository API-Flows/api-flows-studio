import * as React from 'react';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

export default function ErrorMessage({ msg }) {
    return (
        <Container component="main" maxWidth="sm">
            <br/>
            <Alert severity="error">
                {msg}
            </Alert>
        </Container>
    );
}