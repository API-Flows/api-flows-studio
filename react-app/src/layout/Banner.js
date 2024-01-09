import React from "react";
import Typography from '@mui/material/Typography';

const Banner = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center"
            style = {{
                top : "0",
                position: 'absolute',
                textalign: 'center',
                width: '100%',
                padding: '5px',
                marginTop: 'auto'
            }}>
            <Typography variant="h5" gutterBottom align="center">
                API Flows
            </Typography>
        </Typography>
    );
}

export default Banner;
