import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import InputCard from "./InputCard.js";
import StepCard from "./StepCard.js";
import OutputCard from "./OutputCard.js";
import StepDetails from "./StepDetails.js";
import InputDetails from "./InputDetails.js";
import OutputDetails from "./OutputDetails.js";

import * as flows from "./Flow.js"

const SourceDescriptionsTabViewer = ({ workflowsSpec }) => {

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
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

            {workflowsSpec.sourceDescriptions.map((sourceDescription, index) => (
                <Box display="flex">
                    <Box justifyContent="right" sx={{ p: 1 }}>
                    -
                    </Box>
                    <Box justifyContent="left" sx={{ p: 1 }}>
                    <Typography>name: {sourceDescription.name}</Typography>
                    <Typography>url:{sourceDescription.url}</Typography>
                    {sourceDescription.type && <Typography>type: {sourceDescription.type}</Typography>}
                    </Box>
                </Box>
            ))}

            <br/><br/>
        </>
    );
}

export default SourceDescriptionsTabViewer;