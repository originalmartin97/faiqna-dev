import { Container } from '@mui/material'
import { React, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { PersistentSideBar } from '../components/PersistentSideBar'
import TemporarySideBar from '../components/TemporarySideBar'
import Quizlet from '../components/Quizlet'


function DashboardScreen() {
  const sideBarWidth = `calc(100% - 240px)`
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
    <Container
      sx={{
        marginTop: '80px',
        paddingTop: '.5rem',
        paddingBottom: '.5rem',
        height: 'calc(100vh - 80px)',
        maxHeight: '900px',
        maxWidth: '1200px',
        overflow: 'auto',
      }}
    >
      <TopBar sideBarWidth={sideBarWidth} toggleSideBar={toggleSideBar} />
      <PersistentSideBar sideBarWidth={sideBarWidth} />
      <TemporarySideBar open={openSideBar}
        toggleSideBar={toggleSideBar}
        sideBarWidth={sideBarWidth}
        close={toggleSideBar} />
      <Quizlet />
    </Container>
  )
}

export default DashboardScreen;