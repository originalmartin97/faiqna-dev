import { SwipeableDrawer } from '@mui/material'
import React from 'react'
import { Box } from '@mui/material'
import ResponseHistory from './ResponseHistory'



const TemporarySideBar = ({ open, toggleSideBar, sideBarWidth }) => {
    return (
        <SwipeableDrawer open={open} onOpen={toggleSideBar} onClose={toggleSideBar} sx={{ display: { xs: 'block', lg: 'none' } }}>
            <Box width={sideBarWidth} textAlign="left" role="presentation">
                <ResponseHistory />
            </Box>
        </SwipeableDrawer>
    )
}

export default TemporarySideBar
