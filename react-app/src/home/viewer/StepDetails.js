import React, { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StepDetails = ({ step, navigateToTab, navigateToWorkflow, operationDataMap }) => {

console.log('Step content:', step);
    return (
        <>
        <Divider/>
        <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={2}>
                <Typography variant="body1" align="left">
                    stepId:
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" align="left">
                    {step.stepId}&nbsp;&nbsp;&nbsp;{operationDataMap && operationDataMap[step.operationId] && operationDataMap[step.operationId].hasOperationExamples
                        && <ShowExamples operationId={step.operationId} operationExamples={operationDataMap[step.operationId].operationExamples} />}
                </Typography>
            </Grid>
            {step.operationId !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" align="left">
                        operationId:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Box justifyContent="left" display="flex">
                        {operationDataMap[step.operationId] != null && (
                        <HttpMethodChip httpMethod={operationDataMap[step.operationId].httpMethod}/>
                        )}
                        &nbsp;&nbsp;
                        <Typography variant="body1" align="left">
                            {step.operationId}
                        </Typography>
                    </Box>
                </Grid>
                </>
            )}
            {step.operationPath !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" align="left">
                        operationPath:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" align="left">
                        {step.operationPath}
                    </Typography>
                </Grid>
                </>
            )}
            {step.workflowId !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" align="left">
                        workflowId:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" align="left">
                        <Link onClick={() => navigateToWorkflow(step.workflowId)} color="default" underline="hover" sx = {{ cursor: 'pointer' }}>
                            {step.workflowId}
                        </Link>
                    </Typography>
                </Grid>
                </>
            )}
            <Grid item xs={2}>
                <Typography variant="body1" align="left">
                    description:
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" align="left">
                    {step.description}
                </Typography>
            </Grid>
            {step.dependsOn !== null && (
                <>
                <Grid item xs={2}>
                    <Typography variant="body1" align="left">
                        dependsOn:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1" align="left">
                        {step.dependsOn}
                    </Typography>
                </Grid>
                </>
            )}

            <ListParameters parameters={step.parameters} navigateToTab={navigateToTab} />
            <ListOutputs outputs={step.outputs} />
            <ListSuccessCriteria successCriteriaList={step.successCriteria} />
            <ListOnSuccess onSuccessList={step.onSuccess} />
            <ListOnFailure onFailureList={step.onFailure} />
        </Grid>
        </>
    );
}

const ShowExamples = ({ operationId, operationExamples }) => {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleClickOpenDialog = () => {
        // reset selectedValue to first example
        setSelectedValue(operationExamples[0].name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const getJsonExample = () => {
         const selectedExample = operationExamples.find(example => example.name === selectedValue);
         return selectedExample ? selectedExample.example : "";
    };

    return (
        <>
        <Link onClick={() => handleClickOpenDialog()}  sx = {{ cursor: 'pointer' }}>
            (Examples)
        </Link>

        <Dialog
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            PaperProps={{ style: { width: '80%', maxWidth: '800px', position: 'absolute', top: '10%', maxHeight: '500px'  } }}>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                    }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers="true">
                <Grid container justifyContent="center">
                    <Grid item xs={6}>
                        <Select
                          displayEmpty
                          value={selectedValue}
                          onChange={handleSelectChange}
                          fullWidth
                          scroll="paper"
                        >
                            {operationExamples.map((example, index) => (
                                <MenuItem value={example.name}>{example.name}</MenuItem>
                            ))};
                        </Select>
                    </Grid>
                </Grid>
                <pre style={{ fontSize: "small" }}>{getJsonExample()}</pre>
            </DialogContent>
        </Dialog>
        </>
    );

}

const ListParameters = ({ parameters, navigateToTab }) => {

    const [selectedParameter, setSelectedParameter] = useState(null);

    const handleCardClick = (param) => {
        setSelectedParameter(param);
    };

    const getName = (parameter) => {
        if (parameter !== null && parameter.name !== null) {
            return parameter.name;
        }

        if (parameter !== null && parameter.reference !== null) {
            return parameter.reference.substring(parameter.reference.lastIndexOf('/') + 1);
        }
        return "n/a";
    };

    const displayValue = (value) => {
        if (!value.startsWith('$')) {
            value = '"' + value + '"';
        }

        return value;
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
                    {parameters.map((parameter, index) => (
                    <Grid item key={index}>
                        <Chip label={getName(parameter)} onClick={() => handleCardClick(parameter)}
                         variant={selectedParameter === parameter ? 'outlined' : 'filled'}
                         color={selectedParameter === parameter ? 'success' : 'default'} />
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
                    {selectedParameter.reference !== null && (
                        <>
                        <Grid item xs={2}>
                            <Typography variant="body1" color="text.secondary" align="left">
                                reference:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            {selectedParameter.reference && !selectedParameter.reference.startsWith("$components") && <Typography variant="body1" color="text.secondary" align="left">
                                {selectedParameter.reference}
                            </Typography>}
                            {selectedParameter.reference && selectedParameter.reference.startsWith("$components") && <Typography variant="body1" color="text.secondary" align="left">
                                <Link onClick={() => navigateToTab(2)} color="default" underline="hover" sx = {{ cursor: 'pointer' }}>
                                    {selectedParameter.reference}
                                </Link>
                            </Typography>}

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
                                {displayValue(selectedParameter.value)}
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
            <Grid container spacing={0}>
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
                {successCriteriaList.map((successCriteria, index) => (
                    <Box display="flex" width="100%">
                        <Box justifyContent="right" sx={{ p: 0 }}>
                        -
                        </Box>
                        <Box justifyContent="left" sx={{ p: 0 }} >
                            {successCriteria.context && <Typography color="text.secondary" >context: {successCriteria.context}</Typography>}
                            {successCriteria.condition && <Typography color="text.secondary" >condition: {successCriteria.condition}</Typography>}
                            {successCriteria.type && <Typography color="text.secondary" >type: {successCriteria.type}</Typography>}
                        </Box>
                    </Box>
                ))}
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

const HttpMethodChip = ({ httpMethod }) => {

    var backgroundColor = "";

    if( httpMethod === 'GET') {
        backgroundColor = 'green';
    } else if( httpMethod === 'POST') {
       backgroundColor = 'blue';
    } else if( httpMethod === 'PUT') {
       backgroundColor = 'purple';
    } else if( httpMethod === 'PATCH') {
       backgroundColor = 'orange';
    } else if( httpMethod === 'DELETE') {
       backgroundColor = 'red';
    } else {
       backgroundColor = 'gray';
    }

    return (
        <Chip label= {httpMethod}
            variant='filled'
            size = 'small'
            style={{ backgroundColor: backgroundColor, color: 'white' }} />
    );
}

export default StepDetails;