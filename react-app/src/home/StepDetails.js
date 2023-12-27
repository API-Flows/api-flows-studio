import React, { useState, useEffect } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

import Grid from '@mui/material/Grid';

const StepDetails = ({ step }) => {
    return (
        <Grid container spacing={2} sx={{ border: '1px solid #ccc', padding: 2, textAlign: 'center' }}>
            <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary" align="left">
                    stepId:
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" color="text.secondary" align="left">
                    {step.stepId}
                </Typography>
            </Grid>
            {step.operationId !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        operationId:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {step.operationId}
                    </Typography>
                </Grid>
                </>
            )}
            {step.operationRef !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        operationRef:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {step.operationRef}
                    </Typography>
                </Grid>
                </>
            )}
            {step.workflowId !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        workflowId:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {step.workflowId}
                    </Typography>
                </Grid>
                </>
            )}
            <Grid item xs={2}>
                <Typography variant="body1" color="text.secondary" align="left">
                    description:
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" color="text.secondary" align="left">
                    {step.description}
                </Typography>
            </Grid>
            {step.dependsOn !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        dependsOn:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {step.dependsOn}
                    </Typography>
                </Grid>
                </>
            )}

            <ListParameters parameters={step.parameters} />
            <ListOutputs outputs={step.outputs} />
        </Grid>
    );
}

const ListParameters = ({ parameters }) => {

    const [selectedParameter, setSelectedParameter] = useState(null);

    const handleCardClick = (param) => {
        setSelectedParameter(param);

    };

    if (parameters != null) {
        return (
        <Accordion sx =  {{ width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-parameters--content"
                id="panel-parameters-header"
            >
                <Typography>Parameters ({parameters.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    {parameters.map((chip, index) => (
                    <Grid item key={index}>
                        <Chip label={chip.name} onClick={() => handleCardClick(chip)}
                         variant={selectedParameter && selectedParameter.name === chip.name ? 'outlined' : 'filled'} />
                    </Grid>
                    ))}
                </Grid>

                {selectedParameter && <Grid container spacing={2} sx={{ padding: 1, textAlign: 'center' }}>
                    {selectedParameter.name !== null && (
                        <>
                        <Grid item xs={2}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                name:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                {selectedParameter.name}
                            </Typography>
                        </Grid>
                        </>
                    )}
                    {selectedParameter.in !== null && (
                        <>
                        <Grid item xs={2}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                in:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                {selectedParameter.in}
                            </Typography>
                        </Grid>
                        </>
                    )}
                    {selectedParameter.value !== null && (
                        <>
                        <Grid item xs={2}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                value:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                {selectedParameter.value}
                            </Typography>
                        </Grid>
                        </>
                    )}
                    {selectedParameter.target !== null && (
                        <>
                        <Grid item xs={2}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                target:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                {selectedParameter.target}
                            </Typography>
                        </Grid>
                        </>
                    )}
                    {selectedParameter.style !== null && (
                        <>
                        <Grid item xs={2}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                style:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                {selectedParameter.style}
                            </Typography>
                        </Grid>
                        </>
                    )}
                </Grid>}
            </AccordionDetails>
        </Accordion>

        );
    }
}

const ListOutputs = ({ outputs }) => {
    if (outputs != null) {
        return (
        <Accordion sx =  {{ width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-outputs--content"
                id="panel-outputs-header"
            >
                <Typography>Outputs ({Object.keys(outputs).length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={1}>
            {Object.entries(outputs).map(([key, value]) => (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {key}:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {value}
                    </Typography>
                </Grid>
                </>
            ))}
            </Grid>
            </AccordionDetails>
        </Accordion>
        );
    }
}

export default StepDetails;