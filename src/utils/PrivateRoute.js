import { React, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useStore from '../store'

const PrivateRoute = ({ Component }) => {
    const { isLoggedIn, setSnackbarOpen, setSnackbarMessage } = useStore()
    useEffect(() => {
        setSnackbarMessage('You are logged in!')
        // This will only run when `isLoggedIn` changes.
        setSnackbarOpen(true)
    }, [isLoggedIn, setSnackbarOpen]);
    return (
        !isLoggedIn ? <Navigate to="/" replace /> : <Component />
    )
}

export default PrivateRoute
