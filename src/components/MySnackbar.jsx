import { React } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useStore from '../store';

const MySnackbar = () => {
    const { isSnackbarOpen, snackbarMessage, setSnackbarOpen } = useStore()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false); // Update the state to close the Snackbar
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbarMessage}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    )
}



export default MySnackbar