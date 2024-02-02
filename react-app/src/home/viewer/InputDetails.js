import React, { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const InputDetails = ({ inputs, navigateToTab }) => {
    return (
        <>
        {inputs && <ListProperties properties={inputs.properties} navigateToTab={navigateToTab} />}
        {inputs && <ShowRef $ref={inputs.$ref} />}
        {!inputs && <EmptySection/>}
        </>
    );
}

const ListProperties = ({ properties, navigateToTab }) => {
    if (properties != null) {
        return (
        <>
        <Divider/>
         <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
            <table width="100%">
            {Object.entries(properties).map(([key, value]) => (
                <>
                <tr>
                    <td colspan="3" align="left"><Typography>{key}</Typography></td>
                </tr>
                <tr>
                    <td align="left" valign="top" width="1%"></td>
                    <td align="right" valign="top" width="10%"><Typography>type:</Typography></td>
                    {value.type && <td align="left" valign="top" ><Typography>{value.type}</Typography></td>}
                    {value.$ref && !value.$ref.startsWith("#/components") && <td align="left" valign="top" >
                        <Typography>{value.$ref}</Typography></td>}
                    {value.$ref && value.$ref.startsWith("#/components") && <td align="left" valign="top" ><Typography>
                        <Link onClick={() => navigateToTab(2)} color="default" underline="hover" sx = {{ cursor: 'pointer' }}>
                            {value.$ref}
                        </Link>
                    </Typography></td>}
                </tr>
                {value.format && <tr>
                    <td align="left" valign="top" width="1%"></td>
                    <td align="right" valign="top" width="10%"><Typography>format:</Typography></td>
                    <td align="left" valign="top" ><Typography>{value.format}</Typography></td>
                </tr>}
                {value.description && <tr>
                    <td align="left" valign="top" width="1%"></td>
                    <td align="right" valign="top" width="10%"><Typography>description:</Typography></td>
                    <td align="left" valign="top" ><Typography>{value.description}</Typography></td>
                </tr>}
                <tr>
                    <td colspan="3">&nbsp;</td>
                </tr>
                </>
            ))}
            </table>
        </Grid>
        </>
        );
    }
}

const ShowRef = ({ $ref }) => {
    if ($ref != null) {
        return (
        <>
        <Divider/>
        <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
            <table width="100%">
            <tr>
                <td align="right" width="20%"><Typography>$ref:</Typography></td>
                <td align="left"><Typography>{$ref}</Typography></td>
            </tr>
            </table>
        </Grid>
        </>
        );
    }
}

const EmptySection = ({ }) => {
        return (
        <>
            <Divider/>
            <br/>
            <Box display="flex" justifyContent="center">
                <Typography>No Inputs is defined</Typography>
            </Box>
        </>
        );
}

export default InputDetails;

