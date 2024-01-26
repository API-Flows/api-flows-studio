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
import WorkflowsTabViewer from "./WorkflowsTabViewer.js"
import SourceDescriptionsTabViewer from "./SourceDescriptionsTabViewer.js"
import ComponentsTabViewer from "./ComponentsTabViewer.js"
import InfoTabViewer from "./InfoTabViewer.js"
import ErrorMessage from "../../util/ErrorMessage.js";

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

                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>

        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default TabPanel;