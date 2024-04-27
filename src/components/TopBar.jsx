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
    <AppBar position="fixed" sx={{
      backgroundColor: "#2f312F",
    }}>
      <Toolbar
        sx={{
          ml: { xs: 0, sm: 0, md: 0, lg: `${sideBarWidth}px`, xl: `${sideBarWidth}px` },
        }}
      >
        <IconButton
          sx={{
            color: "#f7faf7",
            "&:hover": { backgroundColor: "#a1f5ce", color: "black" },
          }}
          onClick={toggleSideBar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color='#f7faf7'>
          FAIQnA
        </Typography>
        <Button sx={{
          backgroundColor: "#99bdb1", color: "black",
          "&:hover": { backgroundColor: "#c57d83" },
          padding: "1rem",
        }} onClick={(event) => { event.stopPropagation(); signOut(auth) }}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  )
}