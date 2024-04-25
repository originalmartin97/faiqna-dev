import create from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    isLoggedIn: false,
    loading: true,
    isFileUploaded: false,
    setLoginStatus: (status) => set({ isLoggedIn: status, loading: false }, false, "setLoginStatus"),
    setIsFileUploaded: (status) => set({ isFileUploaded: status }, false, "setIsFileUploaded"),
})

const useStore = create(devtools(store))

export default useStore