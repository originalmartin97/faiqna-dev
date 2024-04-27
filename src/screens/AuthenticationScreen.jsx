import { React, useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { googleProvider } from '../firebase'
import { Container, Box, Typography, Card, TextField, Button } from '@mui/material'

const initForm = {
    email: '',
    password: '',
}

const AuthenticationScreen = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState(initForm)
    const handleChange = (event) => setForm((oldForm) => ({ ...oldForm, [event.target.name]: event.target.value }))
    const handleAuth = async () => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, form.email, form.password)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <Box>
                <Typography
                    variant="h1"
                >
                    Welcome to FAIQnA!
                </Typography>
            </Box>
            <Card>
                <Box margin="1.8rem">
                    <TextField
                        name="email"
                        required
                        id="standard-email-input"
                        label="Email"
                        type="email"
                        variant='standard'
                        value={form.email}
                        onChange={handleChange}
                    />
                    <TextField
                        name="password"
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant='standard'
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Box
                        display="flex"
                        justifyContent="center"
                    >
                        <Button
                            disabled={loading || !form.email.trim() || !form.password.trim()}
                            onClick={handleAuth}
                        >
                            Sign in
                        </Button>
                    </Box>
                    <Typography
                        variant="h3"
                        textAlign="center"
                    >
                        OR
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="center"
                    >
                        <Button
                            onClick={handleSignInWithGoogle}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container >
    )
}

export default AuthenticationScreen
