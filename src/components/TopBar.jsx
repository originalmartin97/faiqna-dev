import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const TopBar = ({ sideBarWidth, toggleSideBar }) => {
  return (
    <Box sx={{
      flexGrow: 1,
      position: 'absolute',
      width: { lg: `calc(100% - ${sideBarWidth})` },
      alignItems: 'flex-start'
    }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#2f312F", }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { xs: 'block', lg: 'none' },
              "&:hover": { backgroundColor: "#a1f5ce", color: "black" },
              pt: "0",
              pb: "0",
              pr: "8.5px",
              pl: "8.5px"
            }}
            onClick={toggleSideBar}
          >
            <MenuIcon
              sx={{ mt: '.5rem' }}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FAIQnA
          </Typography>
          <Button sx={{
            backgroundColor: "#a1f5ce", color: "black", padding: ".8rem",
            "&:hover": { backgroundColor: "#c57d83" }
          }} onClick={(event) => { event.stopPropagation(); signOut(auth) }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box >
  )
}