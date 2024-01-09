import React, { useState } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Divider from '@mui/material/Divider';

const InfoTabViewer = ({ workflowsSpecificationView }) => {

    const [workflowsSpec, setWorkflowsSpec] = useState(workflowsSpecificationView.openAPIWorkflowParserResult.openAPIWorkflow);
    const [openAPIWorkflowParserResult, setOpenAPIWorkflowParserResult] = useState(workflowsSpecificationView.openAPIWorkflowParserResult);


    const handleOpenFile = () => {
        window.open(workflowsSpec.location, '_blank');
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
        <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
            <Grid item xs={2}>
                <Typography variant="body1" align="right">
                    Title:
                </Typography>
            </Grid>
            <Grid item xs={10}>{workflowsSpec.info && (
                <Typography variant="body1" align="left">
                    {workflowsSpec.info.title}
                </Typography>
                )}
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" align="right">
                    Version:
                </Typography>
            </Grid>
            <Grid item xs={10}>{workflowsSpec.info && (
                <Typography variant="body1" align="left">
                    {workflowsSpec.info.version}
                </Typography>
                )}
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" align="right">
                    Description:
                </Typography>
            </Grid>
            <Grid item xs={10}>{workflowsSpec.info && (
                <Typography variant="body1" align="left">
                    {workflowsSpec.info.description}
                </Typography>
                )}
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" align="right">
                    Location:
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Box display="flex" >
                    <Typography variant="body1">{workflowsSpec.location}&nbsp;</Typography>
                    <IconButton sx={{ p: 0 }} onClick={handleOpenFile}><OpenInNewIcon fontSize="small" /></IconButton>
                </Box>
            </Grid>
            <Grid item xs={1}>
                &nbsp;
            </Grid>
            <Grid item xs={11}>
                <ListErrors errors={openAPIWorkflowParserResult.errors} valid={openAPIWorkflowParserResult.valid}/>
            </Grid>
        </Grid>
        </>
    );
}

const ListErrors = ({ errors, valid }) => {

    if (errors != null) {
        return (
        <Accordion sx =  {{ width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-outputs--content"
                id="panel-outputs-header"
            >
                <Box display="flex" >
                    <Typography>Errors ({errors.length})&nbsp;</Typography>
                    {!valid && (
                        <IconButton sx={{ p: 0 }} size="small">
                            <ReportProblemIcon sx={{ color: "orange" }} />
                        </IconButton>
                    )}
                    {valid && (
                        <IconButton sx={{ p: 0 }} size="small">
                            <CheckCircleIcon sx={{ color: "green" }} />
                        </IconButton>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={1}>
            {errors.map((error, index) => (
                <>
                <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        {error}
                    </Typography>
                </Grid>
                </>
            ))}
            {valid && (
                <>
                <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" align="left">
                        The OpenAPI workflow specification file is correct
                    </Typography>
                </Grid>
                </>
            )}
            </Grid>
            </AccordionDetails>
        </Accordion>
        );
    }
}



export default InfoTabViewer;