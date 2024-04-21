import { Container, Typography, Button, Box, Card } from '@mui/material';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function DashboardScreen() {
  return (
    <Container>
      <Button onClick={(event) => { event.stopPropagation(); signOut(auth) }}>
        Log out
      </Button>
    </Container>
  );
}

export default DashboardScreen;