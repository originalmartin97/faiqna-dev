import React, { useContext } from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { SelectedDocumentContext } from '../contexts/SelectedDocumentContext';
import useStore from '../store';

const ResponseHistory = ({ responses }) => {

    const { setSelectedDocumentId } = useContext(SelectedDocumentContext);
    const { setIsFileUploaded } = useStore()

    return (
        <>
            {responses && responses.map((response, index) => (
                <ListItem
                    button
                    key={index}
                    onClick={() => { setSelectedDocumentId(response.id); setIsFileUploaded(false) }}
                    sx={{
                        '&:hover': { backgroundColor: '#e1f6ea' },
                        border: '1px hidden #000',
                        borderRadius: '2rem',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: '#2d6a51'
                        }}
                    >
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={response.title} />
                </ListItem>
            ))}
        </>
    );
};

export default ResponseHistory;