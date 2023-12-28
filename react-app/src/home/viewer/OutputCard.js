import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const OutputCard = ({ onSelect, isSelected, workflow }) => {
    return (
        <Card
            onClick={() => onSelect("output") }
            sx={{
                minWidth: 150,
                marginLeft: 5,
                background: isSelected ? '#f0f0f0' : '',
                transform: isSelected ? 'scale(1.3)' : 'scale(1)'
            }}>
            <CardContent sx={{height: 100}}>
                <Typography variant="h6" gutterBottom>
                    Outputs
                </Typography>
                <Counter workflow={workflow} />
          </CardContent>
      </Card>
    );
}

function Counter( {workflow} )  {
    return (
        <Typography variant="body1" color="text.secondary">
          ({Object.keys(workflow.outputs).length})
        </Typography>
    );
}

export default OutputCard;