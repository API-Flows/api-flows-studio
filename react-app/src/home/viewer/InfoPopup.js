import * as React from 'react';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function InfoPopup(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <span>
      <IconButton color="gray" onClick={handleClick} sx={{ p: 0}}>
            <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        style={{ maxWidth: '80%' }}
      >
        <Typography sx={{ p: 1 }}>Description:</Typography>
        <Typography sx={{ p: 1 }}>{props.text}</Typography>
      </Popover>
    </span>
  );
}