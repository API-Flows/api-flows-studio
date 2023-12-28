import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const InputCard = ({ onSelect, isSelected, workflow }) => {
    return (
        <Card
            onClick={() => onSelect("input") }
            sx={{
                minWidth: 150,
                marginRight: 5,
                background: isSelected ? '#f0f0f0' : '',
                transform: isSelected ? 'scale(1.3)' : 'scale(1)'
            }}>
            <CardContent sx={{height: 100}}>
                <Typography variant="h6" gutterBottom>
                    Inputs
                </Typography>
                <Counter workflow={workflow} />
          </CardContent>
      </Card>
    );
}

function Counter( {workflow} )  {
    return (
        <Typography variant="body1" color="text.secondary">
          ({Object.keys(workflow.inputs.properties).length})
        </Typography>
    );
}

export default InputCard;