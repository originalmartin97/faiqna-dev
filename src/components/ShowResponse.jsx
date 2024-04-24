// ShowResponse.jsx
import React from 'react';
import { useLatestResponse } from '../hooks/useLatestResponse';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ShowResponse = () => {
    const { id } = useParams();
    const response = useLatestResponse(id);

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

export default ShowResponse