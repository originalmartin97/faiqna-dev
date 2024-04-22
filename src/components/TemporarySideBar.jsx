import { SwipeableDrawer } from '@mui/material'
import React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'


const TemporarySideBar = ({ open, toggleSideBar, sideBarWidth }) => {
    return (
        <SwipeableDrawer open={open} onOpen={toggleSideBar} onClose={toggleSideBar} sx={{ display: { xs: 'block', lg: 'none' } }}>
            <Box width={sideBarWidth} textAlign="left" role="presentation">
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default TemporarySideBar
