import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    isLoggedIn: false,
    isLoading: false,
    isFileUploaded: false,
    isRightAnswer: false,
    areResponsesFetched: false,
    isSnackbarOpen: false,
    snackbarMessage: "",
    setLoginStatus: (status) => set({ isLoggedIn: status, isLoading: false }, false, "setLoginStatus"),
    setIsFileUploaded: (status) => set({ isFileUploaded: status }, false, "setIsFileUploaded"),
    setIsRightAnswer: (status) => set({ isRightAnswer: status }, false, "setIsRightAnswer"),
    setIsLoading: (status) => set({ isLoading: status }, false, "setIsLoading"),
    setAreResponsesFetched: (status) => set({ areResponsesFetched: status }, false, "setAreResponsesFetched"),
    setSnackbarOpen: (status) => set({ isSnackbarOpen: status }, false, "setSnackbarOpen"),
    setSnackbarMessage: (message) => set({ snackbarMessage: message }, false, "setSnackbarMessage"),
    resetState: () => set({
        isLoggedIn: false,
        isLoading: false,
        isFileUploaded: false,
        isRightAnswer: false,
        areResponsesFetched: false,
    }, false, "resetState"),
})

const useStore = create(devtools(store))

export default useStore