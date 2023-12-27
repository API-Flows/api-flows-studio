import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const OutputCard = ({ onSelect, isSelected, count }) => {
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
                <Typography variant="body1" color="text.secondary">
                  ({count})
                </Typography>
          </CardContent>
      </Card>
    );
}
export default OutputCard;