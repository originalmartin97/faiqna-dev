import React from 'react';
import ShowSpecificResponse from './ShowSpecificResponse'
import ShowLatestResponse from './ShowLatestResponse'
import useStore from '../store'


const ShowResponse = ({ documentId }) => {
    const { isFileUploaded } = useStore()
    if (documentId && !isFileUploaded) {
        return <ShowSpecificResponse documentId={documentId} />
    } else {
        return <ShowLatestResponse />
    }
};

export default ShowResponse