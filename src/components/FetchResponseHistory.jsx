import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useLatestResponses } from '../hooks/useLatestResponses';


const FetchResponseHistory = () => {
    const limit = 5
    const responses = useLatestResponses(limit)

    return (
        <div>
            {responses && responses.map((response, index) => (
                <ListItem button key={index}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={response.title} />
                </ListItem>
            ))}
        </div>
    )
}

export default FetchResponseHistory