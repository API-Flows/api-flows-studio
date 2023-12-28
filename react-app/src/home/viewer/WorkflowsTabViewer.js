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

const WorkflowsTabViewer = ({ workflowsSpec }) => {

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
                <InputCard onSelect={handleCardClick} isSelected={flows.isInput(selectedCard)} workflow={workflowsSpec.workflows[0]}/>

                {workflowsSpec.workflows[0].steps.map((step, index) => (
                    <StepCard index={index} onSelect={handleCardClick} isSelected={selectedCard === index} stepId={step.stepId} operationId={step.operationId}/>
                ))}

                <OutputCard onSelect={handleCardClick} isSelected={flows.isOutput(selectedCard)} workflow={workflowsSpec.workflows[0]}/>
            </Box>

            <br/><br/>

            <Container maxWidth="xl">
                {flows.isInput(selectedCard) && (<InputDetails inputs={workflowsSpec.workflows[0].inputs}/>) }
                {flows.isOutput(selectedCard) && (<OutputDetails outputs={workflowsSpec.workflows[0].outputs}/>) }
                {flows.isStep(selectedCard) && workflowsSpec.workflows[0].steps[selectedCard] && (<StepDetails step={workflowsSpec.workflows[0].steps[selectedCard]} />) }
            </Container>
        </>
    );
}

export default WorkflowsTabViewer;