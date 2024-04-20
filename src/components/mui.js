import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: grey[200],
        },
        html: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export const AppFront = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ 
        backgroundColor: grey[200], 
        height: '100vh', 
        width: '100vw', 
        maxWidth: '100%', 
        maxHeight: '100%', 
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {children}
      </Container>
    </ThemeProvider>
  )
}

export const GeneralPaper = ({ children, ...props }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mx: 1, 
        my: 2, 
        width: 'auto', 
        height:'calc(100% - 32px)', 
        minHeight: '100px', // Add this line
        flexGrow: 1 
      }} 
      {...props}
    >
      <Box p={2} sx={{ overflow: 'auto' }}>
        <Typography variant="body1">{children}</Typography>
      </Box>
    </Paper>
  )
}
export const GeneralCard = ({ children, ...props }) => {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        m: 1, 
        backgroundColor: 'background.paper', 
        borderColor: 'divider',
        height: 'auto', // Change this line
        maxHeight: 'calc(100% - 16px)', // Add this line
        maxWidth: '100%', 
        minHeight: '100px', 
        minWidth: '100px', 
        overflow: 'auto', 
        overflowWrap: 'break-word'
      }} 
      {...props}
    >
      <Box p={1}>
      <Typography variant="body1" style={{ maxHeight: 'calc(100% - 24px)' }}>{children}</Typography>
      </Box>
    </Card>
  )
}

export const GeneralButton = ({ children, ...props }) => {
    return (
      <Button variant="contained" color="primary" sx={{ m: 1 }} {...props}>
        {children}
      </Button>
    )
}


