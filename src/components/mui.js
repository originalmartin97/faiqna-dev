import React from 'react';
import Button from '@mui/material/Button';

export const GeneralButton = ({ children, ...props }) => {
    return (
      <Button variant="contained" color="primary" {...props}>
        {children}
      </Button>
    );
  };

export default GeneralButton;