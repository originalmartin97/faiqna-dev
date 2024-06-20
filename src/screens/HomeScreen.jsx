import React from 'react'
import { Container, Box, Card, Button } from '@mui/material'



const HomeScreen = () => {
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto', // auto height
                maxWidth: '100%', // take full width
                margin: 'auto auto',
            }}
        >
            <Box
                style={{
                    display: 'flex',
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
                        padding: '2rem',
                        width: 'auto',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('Let\'s try the app')}
                    >
                        Let's try the app
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('Reach out to me!')}
                    >
                        Reach out to me!
                    </Button>
                </Card>
            </Box>
        </Container>
    )
}

export default HomeScreen;