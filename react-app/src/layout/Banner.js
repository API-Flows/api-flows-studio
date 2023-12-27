import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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
                    <Link
                            href="https://github.com/API-Flows"
                            underline="none"
                            color="#21b6ae"
                          >
                            API Flows
                          </Link>
            </Typography>

  );
}

export default Banner;
