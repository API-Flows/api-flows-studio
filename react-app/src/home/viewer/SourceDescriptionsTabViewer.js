import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoPopup from "./InfoPopup.js";
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
                      {workflowsSpec.info.title} ({workflowsSpec.info.version}) <InfoPopup text={workflowsSpec.info.description}/>
                    </Typography>
            </Box>
            <br/><br/><br/>

            <Box
                display="flex"
                flexDirection="row"
                overflowX="auto"
                gap={2}
                justifyContent="center"
            >
                content
            </Box>

            <br/><br/>
        </>
    );
}

export default SourceDescriptionsTabViewer;