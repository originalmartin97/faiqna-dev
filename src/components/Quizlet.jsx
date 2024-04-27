import React, { useContext, useMemo } from 'react';
import { Box, Card, Divider } from '@mui/material'
import InputFile from './InputFile'
import { SelectedDocumentContext } from '../contexts/SelectedDocumentContext';
import useStore from '../store';
import { Parser } from '../utils/Parser';
import QnA from './QnA';

const Quizlet = ({ responses, appBarHeight }) => {
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
        <Card
            sx={{
                width: '100vw',
                height: `calc(100vh - 3 * ${appBarHeight}px)`,
                overflow: 'auto',
            }}
        >
            <InputFile />
            <Divider
            /> {/* Add a black line */}
            <br />
            {response && response[0] && response[0].answer1 ? <QnA lines={response} appBarHeight={appBarHeight}></QnA> : "No questions available"}
        </Card>
    )
}

export default Quizlet