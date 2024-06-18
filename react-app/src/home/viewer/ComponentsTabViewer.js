import React, { useState } from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ComponentsTabViewer = ({ workflowsSpec, components }) => {

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
                    {workflowsSpec.info && (
                        <Typography variant="body1" color="text.secondary" align="center">
                          {workflowsSpec.info.title} ({workflowsSpec.info.version})
                        </Typography>
                    )}
            </Box>

            <Box
                display="flex"
                flexDirection="row"
                overflowX="auto"
                gap={2}
                justifyContent="left"
            >
                <pre>
                    <Typography>
                        {components}
                    </Typography>
                </pre>
            </Box>

            <br/><br/>

        </>
    );
}

export default ComponentsTabViewer;