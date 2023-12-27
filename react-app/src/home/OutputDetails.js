import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const OutputDetails = ({ outputs }) => {
    return (
        <Grid container spacing={2} sx={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>
            {Object.entries(outputs).map(([key, value]) => (
            <>
            <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary" align="left">
                    {key}:
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" color="text.secondary" align="left">
                    {value}
                </Typography>
            </Grid>
            </>
            ))}
        </Grid>
    );
}
export default OutputDetails;