import React, { useState, useEffect } from "react";
import axios from "axios";
import Countly from "countly-sdk-web";
import { useLocation } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import IconButton from '@mui/material/IconButton';

import Footer from "../../layout/Footer.js";
import Banner from "../../layout/Banner.js";
import TabPanel from "./TabPanel.js"
import WorkflowsTabViewer from "./WorkflowsTabViewer.js"
import SourceDescriptionsTabViewer from "./SourceDescriptionsTabViewer.js"
import ComponentsTabViewer from "./ComponentsTabViewer.js"
import InfoTabViewer from "./InfoTabViewer.js"
import ErrorMessage from "../../util/ErrorMessage.js";

function Viewer() {

    const [workflowsSpecificationView, setWorkflowsSpecificationView] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const location = useLocation();

    const url = location.state?.url;
    const content = location.state?.content;

    const isJson = (str) => {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
    };

    useEffect(() => {
        setErrorMsg(null);

        let endpoint, payload, contentType;
        if(url) {
            endpoint = '/api/workflow/url';
            payload = url;
            contentType = 'text/plain';

        } else {
            endpoint = '/api/workflow/content';
            payload = content;
            contentType = isJson(payload) ? 'application/json' : 'application/x-yaml';
        }

        axios.post(endpoint, payload, {headers: { "Content-Type": contentType} } )
          .then((response) => {
            setWorkflowsSpecificationView(response.data);
          })
          .catch((error) => {
            if (error.response) {
                console.error(error.response.data)
                if(error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg(error.response.data.error);
                }
            } else {
                console.error("An unexpected error has occurred")
                setErrorMsg("An unexpected error has occurred");
            }

            Countly.q.push(['log_error', error]);
          });
    }, []);

    return (
        <>
            <Banner/>
            <br/><br/>
            <Divider />
            {errorMsg && <ErrorMessage msg={errorMsg} />}
            <Container component="main" maxWidth="false">
                <VerticalTabs workflowsSpecificationView={workflowsSpecificationView} />
            </Container>
            <Footer/>
        </>
    );
}

const VerticalTabs = ({ workflowsSpecificationView }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigateToTab = (index) => {
        setValue(index);
    };

    if(workflowsSpecificationView === null) {
        return <div></div>;
    } else {
        return (
            <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }} >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs "
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Workflows" {...a11yProps(0)} />
                    <Tab label="Source Descriptions" {...a11yProps(1)} />
                    <Tab label="Components" {...a11yProps(2)} />
                    <Tab label={
                        <Box display="flex" alignItems="center">
                            <div>Info</div>
                            {!workflowsSpecificationView.openAPIWorkflowParserResult.valid && (
                                <IconButton size="small">
                                    <ReportProblemIcon sx={{ color: "orange" }} />
                                </IconButton>
                            )}
                        </Box>
                     } {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0} >
                    <WorkflowsTabViewer workflowsSpec={workflowsSpecificationView.openAPIWorkflowParserResult.openAPIWorkflow} navigateToTab={navigateToTab}
                        operationDataMap={workflowsSpecificationView.operationDataMap} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SourceDescriptionsTabViewer workflowsSpecificationView={workflowsSpecificationView} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ComponentsTabViewer workflowsSpec={workflowsSpecificationView.openAPIWorkflowParserResult.openAPIWorkflow} components={workflowsSpecificationView.componentsAsString}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <InfoTabViewer workflowsSpecificationView={workflowsSpecificationView} />
                </TabPanel>
            </Box>
        );
    }
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default Viewer;