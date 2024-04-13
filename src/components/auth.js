import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut as signOutFromFirebase } from 'firebase/auth'
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return { currentUser, auth };
};

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, auth } = useAuth();

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.log(e);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.log(e);
        }
    }

    const signOut = async () => {
        try {
            await signOutFromFirebase(auth);
        } catch (e) {
            console.log(e);
        }
    }

    return (
         <div>
            {currentUser ? (
                <button onClick={signOut}>Sign out</button>
            ) : 
            (
                <div>
                    Welcome to FAIQnA the AI supported QnA web application
                    driven by Firebase™ and ReactJS
                    <p>
                        Please sign in to continue
                    </p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <br />
                    <button onClick={signIn}>Sign in</button>
                    <p>OR</p>
                    <button onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            )}
        </div>
    );
};