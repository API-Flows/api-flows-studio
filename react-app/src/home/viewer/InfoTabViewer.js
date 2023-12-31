import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Divider from '@mui/material/Divider';

import * as flows from "./Flow.js"

const InfoTabViewer = ({ workflowsSpec }) => {
    return (
        <>
            <Box
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                    <Typography variant="body1" color="text.secondary" align="center">
                        {workflowsSpec.info.title} ({workflowsSpec.info.version})
                    </Typography>
            </Box>
            <br/>
        <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
            <table width="100%">
                <tr>
                    <td align="right" width="20%"><Typography>Title:</Typography></td>
                    <td align="left"><Typography>{workflowsSpec.info.title}</Typography></td>
                </tr>
                <tr>
                    <td align="right" width="20%"><Typography>Version:</Typography></td>
                    <td align="left"><Typography>{workflowsSpec.info.version}</Typography></td>
                </tr>
                <tr>
                    <td align="right" width="20%"><Typography>Description:</Typography></td>
                    <td align="left"><Typography>{workflowsSpec.info.description}</Typography></td>
                </tr>
            </table>
        </Grid>
        </>
    );
}


export default InfoTabViewer;