import * as React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import Footer from "../layout/Footer.js";
import Banner from "../layout/Banner.js";


function Workflow() {
  return (
  <div>
    <Banner/>

    <Container maxWidth="xl">
        <Grid container justify="center">
            <Grid container spacing={5}>
                <Grid item xs={2}>
                    {step}
                </Grid>

            </Grid>
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

export default Workflow;