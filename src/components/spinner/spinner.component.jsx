import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Spinner = () => (
    <Box sx={{ width: '100%', minWidth: '150px' }}>
      <LinearProgress />
    </Box>
);

export default Spinner;