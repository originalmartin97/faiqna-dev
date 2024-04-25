import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'

const QnA = ({ task }) => {

    console.log(task.answer1);
    return (
        <Box>
            <Typography variant="h4">
                {task.question}
            </Typography>
            <Card variant="h6">
                <Button>
                    {task.answer1}
                </Button>
                <Button>
                    {task.answer2}
                </Button>
                <Button>
                    {task.answer3}
                </Button>
            </Card>
        </Box>
    )
}

export default QnA
