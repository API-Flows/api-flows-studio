import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import Footer from "../layout/Footer.js";
import Banner from "../layout/Banner.js";

function Home() {

    const [url, setUrl] = useState('');
    const [isValid, setValid] = useState(true);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the URL
        const isValidUrl = validator.isURL(url);

        if (isValidUrl) {
            // Encode the URL before setting it in the state
            const encodedUrl = encodeURIComponent(url);
            navigate("/viewer", { state: { url: encodedUrl } });
        } else {
            setValid(false);
        }
    };

    const handleClearText = (e) => {
        setUrl("");
     };

    return (

        <div>
            <Banner/>
            <br/><br/>

            <Container component="main" maxWidth="md">

                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

                        <Typography variant="body1" color="text.secondary" align="center">
                          <i>Enter the url of the OpenAPI workflow definition</i>
                        </Typography>

                        <Box display="flex" >
                            <TextField
                                name="url"
                                value={url}
                                onChange={(e) => {
                                setUrl(e.target.value);
                                setValid(true);
                                }}
                                        error={!isValid}
                                        helperText={!isValid ? 'Please enter a valid URL' : ''}
                                fullWidth
                                required
                                variant="standard"
                                label="Enter URL"/>

                            <IconButton size="small" edge="start" onClick={handleClearText}>
                                <HighlightOffIcon />
                            </IconButton>

                            <Button
                                style={{
                                    borderRadius: 25,
                                    backgroundColor: "#21b6ae",
                                    padding: "2x 2px",
                                    fontSize: "16px"
                                }}
                                variant="contained" type="submit">Go
                            </Button>
                        </Box>
                    </form>
                </Box>

            </Container>

            <Footer/>
        </div>
    );
}

export default Home;