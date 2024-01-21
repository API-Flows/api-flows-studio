import React, { useState } from "react";
import Countly from "countly-sdk-web";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import Footer from "../layout/Footer.js";
import Banner from "../layout/Banner.js";

function Raw() {

    const [content, setContent] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/viewer", { state: { content: content } });
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
                          <i>Paste the content of the OpenAPI workflow definition</i>
                        </Typography>

                        <Box display="flex" sx={{ marginBottom: 0.5 }}>
                            <TextField
                                name="content"
                                value={content}
                                onChange={(e) => {
                                setContent(e.target.value);
                                }}
                                fullWidth
                                required
                                multiline
                                rows={15}
                                variant="filled"
                                label="Enter content"/>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                style={{
                                    backgroundColor: "#21b6ae",
                                    fontSize: "12px"
                                }}
                                variant="contained" type="submit">Go
                            </Button>
                        </Box>

                    </form>
                </Box>

                <Typography variant="body2" color="textSecondary" align="center" p={1}>
                &nbsp;&nbsp;
                    <Link href="/" color="textSecondary" underline="hover" >(Enter URL)</Link>
                </Typography>


                <br/><br/><br/>

            </Container>

            <Footer/>
        </div>
    );
}

export default Raw;