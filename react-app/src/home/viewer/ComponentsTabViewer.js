import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import InputCard from "./InputCard.js";
import StepCard from "./StepCard.js";
import OutputCard from "./OutputCard.js";
import StepDetails from "./StepDetails.js";
import InputDetails from "./InputDetails.js";
import OutputDetails from "./OutputDetails.js";

const ComponentsTabViewer = ({ workflowsSpec, components }) => {

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

            <Box
                display="flex"
                flexDirection="row"
                overflowX="auto"
                gap={2}
                justifyContent="left"
            >
                <pre>
                    <Typography>
                        {components}
                    </Typography>
                </pre>
            </Box>

            <br/><br/>

        </>
    );
}

export default ComponentsTabViewer;