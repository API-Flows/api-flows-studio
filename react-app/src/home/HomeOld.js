import React, { useState, useEffect } from "react";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Footer from "../layout/Footer.js";
import Banner from "../layout/Banner.js";


function HomeOld() {

  const handleSubmit = (event) => {}
  const handleChange = (event) => {}
  const handleClearText = (event) => {}

const [formData, setFormData] = useState([]);

  return (
  <div>
    <Banner/>

    <Container maxWidth="xl">
        <Grid container justify="center">
           <Hidden xsDown>
                               <Typography variant="body1" color="textSecondary" gutterBottom>
                                   <i>Enter the url of the OpenAPI workflow definition</i>
                               </Typography>
                           </Hidden>
                           <Hidden smUp>
                               <Typography variant="body1" color="textSecondary" gutterBottom>
                                   <i>OpenAPI workflow definition</i>
                               </Typography>
                           </Hidden>

                           <form id="cardForm" ref={f => (this.form = f)} noValidate autoComplete="off" style={{width: '100%'}} onSubmit={handleSubmit}>

                                               <Box display="flex" >
                                                   <TextField
                                                       id="urlId"
                                                       name="url"
                                                       label="Enter URL"
                                                       value={formData.url}
                                                       fullWidth
                                                       onChange={handleChange}
                                                    />
                                                    <IconButton size="small" edge="start" onClick={handleClearText}>
                                                      <HighlightOffIcon />
                                                    </IconButton>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Button style={{
                                                        borderRadius: 25,
                                                        backgroundColor: "#21b6ae",
                                                        padding: "10px 10px",
                                                        fontSize: "16px"
                                                    }} variant="contained" type="submit">Go</Button>
                                               </Box>
                                           </form>

        </Grid>

    </Container>

    <Footer/>

    </div>
  );

}

const step = (
    <React.Fragment>
      <Card>
      <CardContent sx={{height: 100}}>
        <Typography variant="h6" gutterBottom>
          find-pets
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find a Pet
        </Typography>
      </CardContent>
      </Card>
    </React.Fragment>
  );

export default HomeOld;