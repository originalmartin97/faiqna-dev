import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1, // Add this
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Loader
