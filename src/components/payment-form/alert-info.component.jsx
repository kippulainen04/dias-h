import React from 'react';
import { Alert, Popover } from '@mui/material';

const AlertInfo = () => {
    const [anchorEl, setAnchorEl] = React.useState(false);
    const open = Boolean(anchorEl);
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
      setAnchorEl(false);
    };

    return (
        <div>
          <Alert
            severity="error"
            color="warning"
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            sx={{
              fontSize: 20,
              background: 'transparent',
              p: 0,
            }}
          />
          {anchorEl && (
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none'
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus>
              <Alert severity="error">Developer: Test mode</Alert>
            </Popover>
          )}
        </div>
    )
}

export default AlertInfo