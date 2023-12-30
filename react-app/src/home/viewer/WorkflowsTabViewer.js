import React, { useState } from "react";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIcon } from '@mui/material';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import InfoPopup from "./InfoPopup.js";
import InputCard from "./InputCard.js";
import StepCard from "./StepCard.js";
import OutputCard from "./OutputCard.js";
import StepDetails from "./StepDetails.js";
import InputDetails from "./InputDetails.js";
import OutputDetails from "./OutputDetails.js";

import * as flows from "./Flow.js"

const WorkflowsTabViewer = ({ workflowsSpec }) => {

    const [selectedWorkflow, setSelectedWorkflow] = useState(workflowsSpec.workflows[0]);

    const handleWorkflowClick = (workflow) => {
        setSelectedWorkflow(workflow);
    };

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
            <br/>
                <Box display="flex" justifyContent="center" width="100%">
                {workflowsSpec.workflows.map((workflow, index) => (
                    <Chip label={workflow.workflowId} onClick={() => handleWorkflowClick(workflow)}
                        variant={selectedWorkflow && selectedWorkflow.workflowId === workflow.workflowId ? 'outlined' : 'filled'}
                        color={selectedWorkflow && selectedWorkflow.workflowId === workflow.workflowId ? 'success' : 'default'}
                        sx={{ mr: 3,
                                borderRadius: 0,
                                minWidth: '150px',
                                transform: selectedWorkflow && selectedWorkflow.workflowId === workflow.workflowId ? 'scale(1.1)' : 'scale(1.0)' }}/>
                ))}
                </Box>
            <br/>

            {selectedWorkflow && <WorkflowsViewer workflow={selectedWorkflow}/>}

        </>
    );
}

const WorkflowsViewer = ({ workflow }) => {

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };

    return (
        <>

{/* stepper view */}
            <Stepper alternativeLabel activeStep="-1" sx = {{ width: "100%", justifyContent: "center"}}>
                <Step key="inputs">
                  <StepLabel StepIconComponent={CustomStepIcon} onClick={() => handleCardClick("input")}>
                    <ClickableStepContent label="Inputs" />
                  </StepLabel>
                </Step>
                {workflow.steps.map((step, index) => (
                    <Step key={step.stepId}>
                      <StepLabel StepIconComponent={CustomStepIcon}  onClick={() => handleCardClick(index)}>
                        <ClickableStepContent label={step.stepId} />
                      </StepLabel>
                    </Step>
                ))}
                <Step key="outputs">
                  <StepLabel StepIconComponent={CustomStepIcon}  onClick={() => handleCardClick("output")}>
                    <ClickableStepContent label="outputs" />
                  </StepLabel>
                </Step>
            </Stepper>
            <br/>
{/* cards view */}
{/*
                <Box
                display="flex"
                flexDirection="row"
                overflowX="auto"
                gap={4}
                justifyContent="center"
            >
                <InputCard onSelect={handleCardClick} isSelected={flows.isInput(selectedCard)} workflow={workflowsSpec.workflows[0]}/>

                {workflowsSpec.workflows[0].steps.map((step, index) => (
                    <StepCard index={index} onSelect={handleCardClick} isSelected={selectedCard === index} stepId={step.stepId} operationId={step.operationId}/>
                ))}

                <OutputCard onSelect={handleCardClick} isSelected={flows.isOutput(selectedCard)} workflow={workflowsSpec.workflows[0]}/>
            </Box>

            <br/><br/>
*/}
            <Container maxWidth="xl">
                {flows.isInput(selectedCard) && (<InputDetails inputs={workflow.inputs}/>) }
                {flows.isOutput(selectedCard) && (<OutputDetails outputs={workflow.outputs}/>) }
                {flows.isStep(selectedCard) && workflow.steps[selectedCard] && (<StepDetails step={workflow.steps[selectedCard]} />) }
            </Container>
        </>
    );
}

const CustomStepIcon = () => {
  return (
      <CircleTwoToneIcon sx = {{ cursor: 'pointer' }}/>
  );
};

const ClickableStepContent = ({ label }) => (
  <div style={{ cursor: 'pointer' }}>
    <p>{label}</p>
  </div>
);

export default WorkflowsTabViewer;