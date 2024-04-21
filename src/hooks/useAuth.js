import { useState, useEffect } from 'react'
import { auth } from '../firebase'

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true) // Add loading state
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false) // Set loading to false when onAuthStateChanged completes
      })
  
      // Cleanup subscription on unmount
      return unsubscribe
    }, [])
  
    return { currentUser, loading, auth }
}