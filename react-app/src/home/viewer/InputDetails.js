import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const InputDetails = ({ inputs }) => {
    return (
        <ListProperties properties={inputs.properties} />
    );
}

const ListProperties = ({ properties }) => {
    if (properties != null) {
        return (
        <>
        <Divider/>
         <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
            <table width="100%">
            {Object.entries(properties).map(([key, value]) => (
                <tr>
                    <td align="right" width="20%"><Typography>{key}:</Typography></td>
                    <td align="left"><Typography>&nbsp;&nbsp;{value.type}</Typography></td>
                </tr>
            ))}
            </table>
        </Grid>
        </>
        );
    }
}

export default InputDetails;

