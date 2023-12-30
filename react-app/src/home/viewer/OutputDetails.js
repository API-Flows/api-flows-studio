import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const OutputDetails = ({ outputs }) => {
    return (
        <>
        <Divider/>
        <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
            <table width="100%">
            {Object.entries(outputs).map(([key, value]) => (
                <tr>
                    <td align="right" width="20%"><Typography>{key}:</Typography></td>
                    <td align="left"><Typography>&nbsp;&nbsp;{value}</Typography></td>
                </tr>
            ))}
            </table>
        </Grid>
        </>
    );
}
export default OutputDetails;