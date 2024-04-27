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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: {
          xs: '64px',
          sm: '64px',
          md: '64px',
          lg: '64px',
          xl: '64px',
        }
      }}
    >
      <SelectedDocumentContext.Provider value={{ selectedDocumentId, setSelectedDocumentId }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            pt: {
              xs: '64px',
              sm: '64px',
              md: '64px',
              lg: '64px',
              xl: '64px',
            }
          }}
        >
          <TopBar sideBarWidth={sideBarWidth} toggleSideBar={toggleSideBar} />
          <PersistentSideBar responses={responses} sideBarWidth={sideBarWidth} />
          <TemporarySideBar responses={responses} open={openSideBar}
            toggleSideBar={toggleSideBar}
            sideBarWidth={sideBarWidth}
            close={toggleSideBar} />
          <Quizlet sideBarWidth={sideBarWidth} responses={responses} />
        </Box>
      </SelectedDocumentContext.Provider>
    </Container >
  )
}

export default DashboardScreen;