import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import * as flows from "./Flow.js"

const InfoTabViewer = ({ workflowsSpec }) => {

    const handleOpenFile = () => {
        window.open(workflowsSpec.location, '_blank');
    };

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
                <tr>
                    <td align="right" width="20%"><Typography>Location:</Typography></td>
                    <td align="left">
                        <Box display="flex" alignItems="center">
                            <Typography>{workflowsSpec.location}&nbsp;</Typography>
                            <IconButton onClick={handleOpenFile}><OpenInNewIcon fontSize="small" /></IconButton>
                        </Box>
                     </td>
                </tr>
            </table>
        </Grid>
        </>
    );
}


export default InfoTabViewer;