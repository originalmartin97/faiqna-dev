import React from 'react'
import Snackbar from '@mui/material/Snackbar'

const mySnackbar = (message, isOpen) => {
    return (
        <Snackbar>
            autoHideDuration={6000}
            open={isOpen}
            message={message}
        </Snackbar>
    )
}

export default mySnackbar
