import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Footer from "../../layout/Footer.js";
import Banner from "../../layout/Banner.js";
import WorkflowsTabViewer from "./WorkflowsTabViewer.js"
import SourceDescriptionsTabViewer from "./SourceDescriptionsTabViewer.js"
import ComponentsTabViewer from "./ComponentsTabViewer.js"

function Viewer() {

    const [workflowsSpec, setWorkflowsSpec] = useState(null);
    const [components, setComponents] = useState(null);

    useEffect(() => {
        axios.post('/api/workflow/view')
          .then((response) => {
            setWorkflowsSpec(response.data.openAPIWorkflow);
            setComponents(response.data.componentsAsString)
          })
          .catch((error) => {
            console.error('API request error:', error);
          });
    }, []);

    return (
        <>
            <Banner/>
            <br/><br/>
            <Divider />
            <Container component="main" maxWidth="false">
                <VerticalTabs workflowsSpec={workflowsSpec} components={components}/>
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
        {...other}
    >
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

const VerticalTabs = ({ workflowsSpec, components }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(workflowsSpec === null) {
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
            </Tabs>
            <TabPanel value={value} index={0} >
                <WorkflowsTabViewer workflowsSpec={workflowsSpec} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SourceDescriptionsTabViewer workflowsSpec={workflowsSpec} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ComponentsTabViewer workflowsSpec={workflowsSpec} components={components}/>
            </TabPanel>
        </Box>
    );
    }
}

export default Viewer;