// Importing necessary libraries and components
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// TopBar component
export const TopBar = ({ sideBarWidth, toggleSideBar }) => {
  // Function to handle sign out
  const handleSignOut = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up the DOM tree
    signOut(auth); // Signs out the user
  };

  // Returns the TopBar component
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#2f312F" }}>
      <Toolbar
        sx={{
          // Adjusts the left margin based on the screen size
          ml: { xs: 0, sm: 0, md: 0, lg: `${sideBarWidth}px`, xl: `${sideBarWidth}px` },
          display: 'flex', // Makes the Toolbar a flex container
          justifyContent: 'space-between', // Distributes the space between the Toolbar items evenly
        }}
      >
        {/* Hides the IconButton on large screens and up */}
        <Hidden lgUp>
          <IconButton
            sx={{
              color: "#f7faf7",
              // Changes the background color and text color on hover
              "&:hover": { backgroundColor: "#a1f5ce", color: "black" },
            }}
            onClick={toggleSideBar} // Toggles the sidebar when clicked
          >
            <MenuIcon /> {/* Menu icon */}
          </IconButton>
        </Hidden>
        {/* Site title */}
        <Typography variant="h6" color='#f7faf7'>
          FAIQnA
        </Typography>
        {/* Log out button */}
        <Button sx={{
          backgroundColor: "#99bdb1", color: "black",
          // Changes the background color on hover
          "&:hover": { backgroundColor: "#c57d83" },
          padding: "1rem", // Adds padding
        }} onClick={handleSignOut}> {/* Calls the handleSignOut function when clicked */}
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  )
}