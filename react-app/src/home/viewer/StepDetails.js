import React, { useState, useEffect } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const StepDetails = ({ step }) => {
    return (
        <>
        <Divider/>
        <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
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
            <ListSuccessCriteria successCriteriaList={step.successCriteria} />
            <ListOnSuccess onSuccessList={step.onSuccess} />
            <ListOnFailure onFailureList={step.onFailure} />
        </Grid>
        </>
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

const ListSuccessCriteria = ({ successCriteriaList }) => {
    if (successCriteriaList != null) {
        return (
        <Accordion sx =  {{ width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-successCriteria--content"
                id="panel-successCriteria-header"
            >
                <Typography>SuccessCriteria ({successCriteriaList.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box display="flex" width="100%" >
                {successCriteriaList.map((successCriteria, index) => (
                    <>
                        {successCriteria.context &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            context: {successCriteria.context}&nbsp;&nbsp;
                        </Typography>
                        }
                        {successCriteria.condition &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            context: {successCriteria.condition}&nbsp;&nbsp;
                        </Typography>
                        }
                        {successCriteria.type &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            context: {successCriteria.type}&nbsp;&nbsp;
                        </Typography>
                        }
                    </>
                ))}
                </Box>
            </AccordionDetails>
        </Accordion>
        );
    }
}

const ListOnSuccess = ({ onSuccessList }) => {
    if (onSuccessList != null) {
        return (
        <Accordion sx =  {{ width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-onSuccess--content"
                id="panel-onSuccess-header"
            >
                <Typography>OnSuccess ({onSuccessList.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box width="100%" >
                {onSuccessList.map((onSuccess, index) => (
                    <>
                        {onSuccess.type &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            type: {onSuccess.type}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onSuccess.workflowId &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            workflowId: {onSuccess.workflowId}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onSuccess.stepId &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            stepId: {onSuccess.stepId}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onSuccess.criteria && <Box display="flex" width="100%" >
                            {onSuccess.criteria.map((successCriteria, index) => (
                            <>
                                {successCriteria.context &&
                                <Typography variant="body1" color="text.secondary" align="left">
                                    context: {successCriteria.context}&nbsp;&nbsp;
                                </Typography>
                                }
                                {successCriteria.condition &&
                                <Typography variant="body1" color="text.secondary" align="left">
                                    condition: {successCriteria.condition}&nbsp;&nbsp;
                                </Typography>
                                }
                                {successCriteria.type &&
                                <Typography variant="body1" color="text.secondary" align="left">
                                    type: {successCriteria.type}&nbsp;&nbsp;
                                </Typography>
                                }
                            </>
                            ))}
                        </Box>}
                    </>
                ))}
                </Box>
            </AccordionDetails>
        </Accordion>
        );
    }
}

const ListOnFailure = ({ onFailureList }) => {
    if (onFailureList != null) {
        return (
        <Accordion sx =  {{ width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-onFailure--content"
                id="panel-onFailure-header"
            >
                <Typography>OnFailure ({onFailureList.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box width="100%" >
                {onFailureList.map((onFailure, index) => (
                    <>
                        {onFailure.type &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            type: {onFailure.type}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onFailure.workflowId &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            workflowId: {onFailure.workflowId}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onFailure.stepId &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            stepId: {onFailure.stepId}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onFailure.retryAfter &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            retryAfter: {onFailure.retryAfter}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onFailure.retryLimit &&
                        <Typography variant="body1" color="text.secondary" align="left">
                            retryLimit: {onFailure.retryLimit}&nbsp;&nbsp;
                        </Typography>
                        }
                        {onFailure.criteria && <Box display="flex" width="100%" >
                            {onFailure.criteria.map((onFailureCriteria, index) => (
                            <>
                                {onFailureCriteria.context &&
                                <Typography variant="body1" color="text.secondary" align="left">
                                    context: {onFailureCriteria.context}&nbsp;&nbsp;
                                </Typography>
                                }
                                {onFailureCriteria.condition &&
                                <Typography variant="body1" color="text.secondary" align="left">
                                    condition: {onFailureCriteria.condition}&nbsp;&nbsp;
                                </Typography>
                                }
                                {onFailureCriteria.type &&
                                <Typography variant="body1" color="text.secondary" align="left">
                                    type: {onFailureCriteria.type}&nbsp;&nbsp;
                                </Typography>
                                }
                            </>
                            ))}
                        </Box>}
                    </>
                ))}
                </Box>
            </AccordionDetails>
        </Accordion>
        );
    }
}

export default StepDetails;