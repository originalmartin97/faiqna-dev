import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut as signOutFromFirebase } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { GeneralButton, GeneralCard } from './mui'
import { NavigateToDashboard } from './Navigate'

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

export const MySignOut = () => {
    const { currentUser, auth } = useAuth(); // Get currentUser and auth from useAuth

    const signOut = async () => {
        if (currentUser) { // Check if a user is currently logged in
            try {
                await signOutFromFirebase(auth);
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("No user is currently logged in.");
        }
    }

    return (
        currentUser ? <GeneralButton onClick={signOut}>Sign out</GeneralButton> : null // Render GeneralButton only if a user is currently logged in
    );
}

export const MySignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, auth, loading } = useAuth();
    const navigateToDashboard = NavigateToDashboard(); // Call NavigateToDashboard inside the Auth component

    const signInWithEmail = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigateToDashboard(); // Use navigateToDashboard here
        } catch (e) {
            console.log(e);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigateToDashboard(); // Use navigateToDashboard here
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <GeneralCard>
                {loading ? (
                    <p>Loading...</p>
                ) :  currentUser ? (
                        <GeneralCard>
                            <GeneralButton onClick={navigateToDashboard}>Let's start our journey!</GeneralButton>
                        </GeneralCard>
                ) : (
                    <>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        />
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        />
                        <GeneralButton onClick={signInWithEmail}>Sign in</GeneralButton>
                        <p type='text'>OR</p>
                        <GeneralButton onClick={signInWithGoogle}>Sign in with Google</GeneralButton>
                    </>
                )}
        </GeneralCard>
    )
}