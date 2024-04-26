import React from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ResponseHistory from './ResponseHistory';


export const PersistentSideBar = ({ sideBarWidth, responses }) => {
    return (
        <Box
            sx={{
                width: { lg: sideBarWidth },
                flexShrink: { lg: 0 },
            }}
        >
            <Drawer variant="permanent" anchor="left" sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
                <Box width={sideBarWidth} textAlign="left" role="presentation">
                    <ResponseHistory responses={responses} />
                </Box>
            </Drawer>
        </Box>
    )
}