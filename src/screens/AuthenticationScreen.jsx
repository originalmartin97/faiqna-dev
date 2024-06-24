import { React, useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { googleProvider } from '../firebase'
import { Container, Box, Typography, Card, TextField, Button } from '@mui/material'
import mySnackbar from '../components/Snackbar'

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
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleSignInWithGoogle = async () => {
        try {
            setLoading(true)
            await signInWithPopup(auth, googleProvider)
            setLoading(false)
            mySnackbar("Signed in Successfully!", true)
            setTimeout(() => {
                mySnackbar("Success!", true)
            }, 3000)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '3.5rem',
                }}
            >
                <Typography
                    variant="h1"
                    align="center"
                    style={{
                        textDecoration: 'underline',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        textAlignLast: 'center',
                    }}
                >
                    Welcome to FAIQnA!
                </Typography>
            </Box >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '600px',
                    }}
                >
                    <Typography variant="h6" align="center">
                        Sign in
                    </Typography>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '1rem',
                        }}
                    >
                        <TextField
                            name="email"
                            required
                            id="standard-email-input"
                            label="Email"
                            type="email"
                            variant='standard'
                            value={form.email}
                            onChange={handleChange}
                            sx={{
                                mb: '1rem',
                            }}
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
                            marginTop="1rem"
                        >
                            <Button
                                disabled={loading || !form.email.trim() || !form.password.trim()}
                                onClick={handleAuth}
                                sx={{
                                    backgroundColor: "#99bdb1",
                                    color: "black",
                                    "&:hover": { backgroundColor: "#2d6a51", color: "#f7faf7" },
                                    padding: "1rem",
                                }}
                            >
                                Sign in
                            </Button>
                        </Box>
                        <Typography
                            variant="h3"
                            textAlign="center"
                            margin="1rem"
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
        </>
    )
}

export default AuthenticationScreen
