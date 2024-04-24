import React, { useContext } from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useLatestResponses } from '../hooks/useLatestResponses';
import { SelectedDocumentContext } from '../contexts/SelectedDocumentContext';

const FetchResponseHistory = () => {
    const responses = useLatestResponses();
    const { setSelectedDocumentId } = useContext(SelectedDocumentContext);

    return (
        <div>
            {responses && responses.map((response, index) => (
                <ListItem button key={index} onClick={() => setSelectedDocumentId(response.id)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={response.title} />
                </ListItem>
            ))}
        </div>
    );
};

export default FetchResponseHistory;