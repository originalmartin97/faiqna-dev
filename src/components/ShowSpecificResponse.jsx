import React from 'react';
import { useLatestResponses } from '../hooks/useLatestResponses';
import { Typography } from '@mui/material';

const ShowSpecificResponse = ({ documentId }) => {
    const responses = useLatestResponses();
    const response = responses.find(response => response.id === documentId);

    const responseLines = response && response.content ? (
        <Typography>
            {response.content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </Typography>
    ) : null

    return responseLines
};

export default ShowSpecificResponse