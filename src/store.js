import create from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    isLoggedIn: false,
    isLoading: false,
    isFileUploaded: false,
    isRightAnswer: false,
    setLoginStatus: (status) => set({ isLoggedIn: status, isLoading: false }, false, "setLoginStatus"),
    setIsFileUploaded: (status) => set({ isFileUploaded: status }, false, "setIsFileUploaded"),
    setIsRightAnswer: (status) => set({ isRightAnswer: status }, false, "setIsRightAnswer"),
    setIsLoading: (status) => set({ isLoading: status }, false, "setIsLoading"),
})

const useStore = create(devtools(store))

export default useStore