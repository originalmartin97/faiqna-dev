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
    <Box sx={{ flexGrow: 1, position: 'absolute', width: { lg: `calc(100% - ${sideBarWidth})` } }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#2f312F", }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', lg: 'none' } }}
            onClick={toggleSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FAIQnA
          </Typography>
          <Button sx={{
            backgroundColor: "#a1f5ce", color: "black", padding: "1rem",
            "&:hover": { backgroundColor: "#c57d83" }
          }} onClick={(event) => { event.stopPropagation(); signOut(auth) }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box >
  )
}