import React from 'react';
import ShowSpecificResponse from './ShowSpecificResponse'
import ShowLatestResponse from './ShowLatestResponse'

const ShowResponse = ({ documentId }) => {
    if (documentId) {
        return <ShowSpecificResponse documentId={documentId} />
    } else {
        return <ShowLatestResponse />
    }
};

export default ShowResponse