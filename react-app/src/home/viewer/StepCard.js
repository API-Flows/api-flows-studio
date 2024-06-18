import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const StepCard = ({ index, onSelect, isSelected, stepId, operationId }) => {
    return (
        <Card
            onClick={() => onSelect(index) }
            sx={{
                minWidth: 150,
                background: isSelected ? '#f0f0f0' : '',
                transform: isSelected ? 'scale(1.3)' : 'scale(1.0)',
                cursor: 'pointer',
            }}>
            <CardContent sx={{height: 100}}>
                <Typography variant="h6" gutterBottom>
                  {stepId}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ({operationId})
                </Typography>
          </CardContent>
      </Card>
    );
}
export default StepCard;