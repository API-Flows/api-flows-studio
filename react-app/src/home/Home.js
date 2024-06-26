import React, { useState, useRef } from "react";
import Countly from "countly-sdk-web";

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
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the URL
        const isValidUrl = validator.isURL(url);

        if (isValidUrl) {
            Countly.q.push(['add_event',{
                "key": "click",
                "segmentation": {
                    "action": "submit"
              }
            }]);

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

    const handlePrefill = (value) => {
        setUrl(value);
        inputRef.current.focus();
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
                                label="Enter URL"
                                inputRef={inputRef}/>

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

                <br/><br/><br/>

                    <Typography variant="body1" style={{ cursor: 'pointer' }}
                        onClick={() => handlePrefill('https://raw.githubusercontent.com/OAI/Arazzo-Specification/main/examples/1.0.0/pet-coupons.arazzo.yaml')}
                    >
                        <Button variant="outlined" size="small" color="success">
                            <Typography variant="button" style={{fontFamily: 'YourCustomFont, sans-serif', textTransform: 'none'}}>
                            Try out the Arazzo example 'Petstore - Apply Coupons'
                            </Typography>
                        </Button>
                    </Typography>
                    <br/>

                    <Typography variant="body1" style={{ cursor: 'pointer' }}
                        onClick={() => handlePrefill('https://raw.githubusercontent.com/API-Flows/openapi-workflow-registry/main/root/adyen/adyen-giving.yaml')}
                    >
                        <Button variant="outlined" size="small" color="success">
                            <Typography variant="button" style={{fontFamily: 'YourCustomFont, sans-serif', textTransform: 'none'}}>
                            Try out the Adyen Giving workflow
                            </Typography>
                        </Button>
                    </Typography>
                    <br/>

                    <Typography variant="body1" style={{ cursor: 'pointer' }}
                        onClick={() => handlePrefill('https://raw.githubusercontent.com/API-Flows/openapi-workflow-registry/main/root/adyen/adyen-tokenization')}
                    >
                        <Button variant="outlined" size="small" color="success">
                            <Typography variant="button" style={{fontFamily: 'YourCustomFont, sans-serif', textTransform: 'none'}}>
                            Try out the Adyen Make Recurring Payments workflow
                            </Typography>
                        </Button>
                    </Typography>

            </Container>

            <Footer/>
        </div>
    );
}

export default Home;