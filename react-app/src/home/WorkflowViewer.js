import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

import Footer from "../layout/Footer.js";
import Banner from "../layout/Banner.js";
import ErrorMessage from "../util/ErrorMessage.js";
import InfoPopup from "./InfoPopup.js";
import InputCard from "./InputCard.js";
import StepCard from "./StepCard.js";
import OutputCard from "./OutputCard.js";
import StepDetails from "./StepDetails.js";
import InputDetails from "./InputDetails.js";
import OutputDetails from "./OutputDetails.js";

import * as flows from "./Flow.js"

function WorkflowViewer() {

    const [workflowView, setWorkflowView] = useState({
        title: "",
        version: "",
        description: "",
        inputsView: 0,
        outputsView: 0,
        stepViews: []
    });

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };

    useEffect(() => {
        axios.post('/api/workflow/view')
          .then((response) => {
            setWorkflowView(response.data);
          })
          .catch((error) => {
            console.error('API request error:', error);
          });

    }, []);

    const workflowAsJson = JSON.stringify(workflowView, null, 2);


    return (

        <div>
                <Banner/>
        <br/><br/>

        <Container component="main" maxWidth="md">

            <Box
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >

                    <Typography variant="body1" color="text.secondary" align="center">
                      {workflowView.title} ({workflowView.version}) <InfoPopup text={workflowView.description}/>
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

                    <InputCard onSelect={handleCardClick} isSelected={flows.isInput(selectedCard)} count={workflowView.inputsView.numProperties}/>

                    {workflowView.stepViews.map((item, index) => (
                        <StepCard index={index} onSelect={handleCardClick} isSelected={selectedCard === index} stepId={item.step.stepId} operationId={item.step.operationId}/>
                    ))}

                    <OutputCard onSelect={handleCardClick} isSelected={flows.isOutput(selectedCard)} count={workflowView.outputsView.numProperties}/>

                </Box>

            </Container>

            <br/><br/>

            <Container component="main" maxWidth="md">
                {flows.isInput(selectedCard) && (<InputDetails inputs={workflowView.inputsView.schema}/>) }
                {flows.isOutput(selectedCard) && (<OutputDetails outputs={workflowView.outputsView.outputs}/>) }
                {flows.isStep(selectedCard) && workflowView.stepViews[selectedCard] && (<StepDetails step={workflowView.stepViews[selectedCard].step} />) }
            </Container>

            <Footer/>
            </div>


  );
}


export default WorkflowViewer;