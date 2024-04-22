import { Container, Button } from '@mui/material'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import MenuAppBard from '../components/AppBar'

function DashboardScreen() {
  return (
    <Container>
      <Button onClick={(event) => { event.stopPropagation(); signOut(auth) }}>
        Log out
      </Button>
    </Container>
  )
}

export default DashboardScreen;