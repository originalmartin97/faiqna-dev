import { Container, Button } from '@mui/material'
import { React, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { TopBar } from '../components/TopBar'
import { SideBar } from '../components/PersistentSideBar'
import TemporarySideBar from '../components/TemporarySideBar'


function DashboardScreen() {
  const sideBarWidth = 300
  const [openSideBar, setOpenSideBar] = useState(false)
  const toggleSideBar = (event) => {
    event.stopPropagation()
    setOpenSideBar(!openSideBar)
  }
  const closeSideBar = (event) => {
    event.stopPropagation()
    setOpenSideBar(false)
  }
  return (
    <Container>
      <TopBar sideBarWidth={sideBarWidth} toggleSideBar={toggleSideBar} />
      <SideBar sideBarWidth={sideBarWidth} />
      <TemporarySideBar open={openSideBar} toggleSideBar={toggleSideBar} sideBarWidth={sideBarWidth} close={toggleSideBar} />
    </Container>
  )
}

export default DashboardScreen;