import React, { useContext, useMemo } from 'react';
import { Box, Card, Divider } from '@mui/material'
import InputFile from './InputFile'
import { SelectedDocumentContext } from '../contexts/SelectedDocumentContext';
import useStore from '../store';
import { Parser } from '../utils/Parser';
import QnA from './QnA';

const Quizlet = ({ responses, sideBarWidth }) => {
    const { selectedDocumentId } = useContext(SelectedDocumentContext);
    const { isFileUploaded } = useStore()

    const handleResponse = () => {
        if (selectedDocumentId && !isFileUploaded) {
            const response = responses.find(response => response.id === selectedDocumentId);
            if (response && typeof response.content === 'string') {
                return Parser(response.content);
            }
        }
        if (responses && responses[0] && typeof responses[0].content === 'string') {
            return Parser(responses[0].content);
        }
    }
    const response = useMemo(handleResponse, [responses, selectedDocumentId, isFileUploaded]);

    return (
        <Box
            sx={{
                display: 'flex', // Use flexbox for layout
                justifyContent: 'center', // Center horizontally
                alignItems: 'flex-start', // Start from the top vertically
                overflow: 'auto', // Add a scrollbar when needed
                padding: ".5rem",
                minHeight: "300px",
                minWidth: "200px",
                margin: "1rem",
            }}
        >
            <Card
                sx={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "1rem",
                    margin: "1rem",
                    overflow: 'auto', // Add a scrollbar when needed

                }}
            >
                <InputFile />
                <Divider
                /> {/* Add a black line */}
                <br />
                {response && response[0] && response[0].answer1 ? <QnA lines={response}></QnA> : "No questions available"}
            </Card>
        </Box >
    )
}

export default Quizlet