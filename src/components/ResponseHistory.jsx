import React, { useContext } from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useLatestResponses } from '../hooks/useLatestResponses';
import { SelectedDocumentContext } from '../contexts/SelectedDocumentContext';
import useStore from '../store';

const ResponseHistory = ({responses}) => {

    const { setSelectedDocumentId } = useContext(SelectedDocumentContext);
    const { setIsFileUploaded } = useStore()

    return (
        <div>
            {responses && responses.map((response, index) => (
                <ListItem button key={index} onClick={() => { setSelectedDocumentId(response.id); setIsFileUploaded(false) }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={response.title} />
                </ListItem>
            ))}
        </div>
    );
};

export default ResponseHistory;