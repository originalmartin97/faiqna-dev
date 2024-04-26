import { Container, Box } from '@mui/material'
import { React, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { PersistentSideBar } from '../components/PersistentSideBar'
import TemporarySideBar from '../components/TemporarySideBar'
import Quizlet from '../components/Quizlet'
import { SelectedDocumentContext } from '../contexts/SelectedDocumentContext';
import { useLatestResponses } from '../hooks/useLatestResponses';


function DashboardScreen() {
  const responses = useLatestResponses();

  const sideBarWidth = 250
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
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
        display: 'flex',
        overflow: 'auto',
      }}
    >
      <SelectedDocumentContext.Provider value={{ selectedDocumentId, setSelectedDocumentId }}>
        <TopBar sideBarWidth={sideBarWidth} toggleSideBar={toggleSideBar} />
        <PersistentSideBar responses={responses} sideBarWidth={sideBarWidth} />
        <TemporarySideBar responses={responses} open={openSideBar}
          toggleSideBar={toggleSideBar}
          sideBarWidth={sideBarWidth}
          close={toggleSideBar} />
        <Box
          component="main"
          sx={{
            flexgrow: 1,
            p: 3,
            position: 'relative',
            width: `calc(100% - ${sideBarWidth}px)`,
          }}
        >
          <Quizlet sideBarWidth={sideBarWidth} responses={responses} />
        </Box>
      </SelectedDocumentContext.Provider>
    </Container >
  )
}

export default DashboardScreen;