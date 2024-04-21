import create from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    isLoggedIn: false,
    loading: true,
    setLoginStatus: (status) => set({ isLoggedIn: status, loading: false}, false, "setLoginStatus"),
})

const useStore = create(devtools(store))

export default useStore