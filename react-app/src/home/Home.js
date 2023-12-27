import React, { useState } from "react";
import axios from "axios";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';

import Footer from "../layout/Footer.js";
import Banner from "../layout/Banner.js";
import ErrorMessage from "../util/ErrorMessage.js";

function Home() {

    const [formData, setFormData] = useState({
        url: "",
    });
    const [workflowView, setWorkflowView] = useState({
    });

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/home/fetch', formData)
            .then((response) => {
            console.log(response);
            setWorkflowView(response);
        })
        .catch((error) => {
            console.error('Request error:', error);
        });
    };

    const handleClearText = (e) => {

    setFormData({
        ...formData,
        'url': '',
        });
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
                  alignItems="center"
                >

    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

        <Typography variant="body1" color="text.secondary" align="center">
          <i>Enter the url of the OpenAPI workflow definition</i>
        </Typography>

        <Box display="flex" >
      <TextField
        name="url"
        value={formData.url}
        onChange={handleChange}
        fullWidth
        required
        variant="standard"
        label="Enter URL"
      />
<IconButton size="small" edge="start" onClick={handleClearText}>
                           <HighlightOffIcon />
                         </IconButton>


      <Button style={{
                                   borderRadius: 25,
                                   backgroundColor: "#21b6ae",
                                   padding: "7px 7px",
                                   fontSize: "16px"
                               }} variant="contained" type="submit">Go</Button>

      </Box>
    </form>
                </Box>


            </Container>
            <Footer/>
            </div>


  );
}


export default Home;