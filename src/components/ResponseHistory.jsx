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
                        margin: '0.5rem 0.01rem 0.5rem 0.01rem',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: '#2d6a51',
                            minWidth: '32px'
                        }}
                    >
                        <InboxIcon
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={response.id}
                        title={response.id}
                        primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    />
                </ListItem>
            ))}
        </>
    );
};

export default ResponseHistory;