import React from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import FetchResponseHistory from './FetchResponseHistory';


export const PersistentSideBar = ({ sideBarWidth }) => {
    return (
        <Drawer variant="permanent" anchor="left" sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box width={sideBarWidth} textAlign="left" role="presentation">
                <FetchResponseHistory />
            </Box>
        </Drawer>
    )
}