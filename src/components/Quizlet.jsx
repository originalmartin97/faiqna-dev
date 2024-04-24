import React from 'react'
import { Box, Card, Divider } from '@mui/material'
import InputFile from './InputFile'
import ShowResponse from './ShowResponse'

const Quizlet = () => {
    return (
        <Box
            sx={{
                display: 'flex', // Use flexbox for layout
                justifyContent: 'center', // Center horizontally
                alignItems: 'flex-start', // Start from the top vertically
                width: '100%', // Take up a little bit less space than the container width
                height: '100%', // Take up all the height
                overflow: 'auto', // Add a scrollbar when needed
                padding: ".5rem",
                minHeight: "300px",
                minWidth: "200px",
            }}
        >
            <Card
                sx={{
                    width: '100%', // Take up all the width
                    height: "100%", // Take up all the height
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "1rem",
                    minWidth: "200px",
                    minHeight: "300px",
                    overflow: 'auto', // Add a scrollbar when needed

                }}
            >
                <InputFile />
                <Divider
                /> {/* Add a black line */}
                <br />
                Shi' got super hot
                <ShowResponse />
            </Card>
        </Box >
    )
}

export default Quizlet