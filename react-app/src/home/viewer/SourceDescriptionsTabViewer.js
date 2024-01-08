import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';

import InputCard from "./InputCard.js";
import StepCard from "./StepCard.js";
import OutputCard from "./OutputCard.js";
import StepDetails from "./StepDetails.js";
import InputDetails from "./InputDetails.js";
import OutputDetails from "./OutputDetails.js";

const SourceDescriptionsTabViewer = ({ workflowsSpec }) => {

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };

    const openSourceDescription = (filename) => {
        const baseUrl = workflowsSpec.location.substring(0, workflowsSpec.location.lastIndexOf('/') + 1);
        const filepath = baseUrl + filename;
        window.open(filepath, '_blank');
    };

    return (
        <>
            <Box
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                    {workflowsSpec.info && (
                        <Typography variant="body1" color="text.secondary" align="center">
                          {workflowsSpec.info.title} ({workflowsSpec.info.version})
                        </Typography>
                    )}
            </Box>
            <br/>

            {workflowsSpec.sourceDescriptions && workflowsSpec.sourceDescriptions.map((sourceDescription, index) => (
                <Box display="flex">
                    <Box justifyContent="right" sx={{ p: 1 }}>
                    -
                    </Box>
                    <Box justifyContent="left" sx={{ p: 1 }}>
                    <Typography>name: {sourceDescription.name}</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography>url:{sourceDescription.url}</Typography>
                        <IconButton onClick={() => openSourceDescription(sourceDescription.url)}><OpenInNewIcon fontSize="small" /></IconButton>
                    </Box>
                    {sourceDescription.type && <Typography>type: {sourceDescription.type}</Typography>}

                    </Box>
                </Box>
            ))}

            <br/><br/>
        </>
    );
}

export default SourceDescriptionsTabViewer;