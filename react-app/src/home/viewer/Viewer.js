import React, { useState, useEffect } from "react";
import axios from "axios";
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
import WorkflowsTabViewer from "./WorkflowsTabViewer.js"
import SourceDescriptionsTabViewer from "./SourceDescriptionsTabViewer.js"
import ComponentsTabViewer from "./ComponentsTabViewer.js"
import InfoTabViewer from "./InfoTabViewer.js"
import ErrorMessage from "../../util/ErrorMessage.js";

function Viewer() {

    const [workflowsSpecificationView, setWorkflowsSpecificationView] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const location = useLocation();

    const encodedUrl = encodeURIComponent(location.state?.url || '');

    useEffect(() => {
        setErrorMsg(null);
        axios.post('/api/workflow/view', location.state?.url)
          .then((response) => {
            setWorkflowsSpecificationView(response.data);
          })
          .catch((error) => {
            if (error.response) {
                console.error(error.response.data)
                setErrorMsg(error.response.data.message);
            } else {
                console.error("An unexpected error has occurred")
                setErrorMsg("An unexpected error has occurred");
            }
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={ {width: '100%'} }
            {...other}>
                {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const VerticalTabs = ({ workflowsSpecificationView }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(workflowsSpecificationView === null) {
        return <div></div>;
    } else {
    console.log(workflowsSpecificationView.openAPIWorkflowParserResult)

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
                <WorkflowsTabViewer workflowsSpec={workflowsSpecificationView.openAPIWorkflowParserResult.openAPIWorkflow} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SourceDescriptionsTabViewer workflowsSpec={workflowsSpecificationView.openAPIWorkflowParserResult.openAPIWorkflow} />
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

export default Viewer;