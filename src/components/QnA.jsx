import React, { useState, useEffect } from 'react'
import { Box, Button, Card, LinearProgress, Typography } from '@mui/material'
import useStore from '../store'

const QnA = ({ lines }) => {
    const defaultColor = '#2D6A51';

    const { isLoading, setIsLoading } = useStore();

    const [clicked, setClicked] = useState(false);
    const [shouldUpdateIndex, setShouldUpdateIndex] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const [colors, setColors] = useState({
        answer1: defaultColor,
        answer2: defaultColor,
        answer3: defaultColor,
    });
    const tasks = lines || [];

    useEffect(() => {
        setColors({
            answer1: defaultColor,
            answer2: defaultColor,
            answer3: defaultColor,
        });
        setCurrentTaskIndex(0);
    }, [lines]);

    const handleClick = () => {
        setColors({
            answer1: tasks[currentTaskIndex]?.answer1?.includes('*') ? '#a1f5ce' : '#c57d83',
            answer2: tasks[currentTaskIndex]?.answer2?.includes('*') ? '#a1f5ce' : '#c57d83',
            answer3: tasks[currentTaskIndex]?.answer3?.includes('*') ? '#a1f5ce' : '#c57d83',
        });
        setClicked(true);
    }

    const handleNext = () => {
        if (currentTaskIndex < tasks.length - 1) {
            setIsLoading(true);
            setColors({
                answer1: defaultColor,
                answer2: defaultColor,
                answer3: defaultColor,
            })
            setShouldUpdateIndex(true);
            setClicked(false);
        }
    }

    const handlePrevious = () => {
        if (currentTaskIndex > 0) {
            setIsLoading(true);
            setColors({
                answer1: tasks[currentTaskIndex]?.answer1?.includes('*') ? '#a1f5ce' : '#c57d83',
                answer2: tasks[currentTaskIndex]?.answer2?.includes('*') ? '#a1f5ce' : '#c57d83',
                answer3: tasks[currentTaskIndex]?.answer3?.includes('*') ? '#a1f5ce' : '#c57d83',
            });
            setCurrentTaskIndex(currentTaskIndex - 1);
            setIsLoading(false);
            setClicked(true);
        }
    }

    useEffect(() => {
        if (shouldUpdateIndex) {
            setCurrentTaskIndex(currentTaskIndex + 1);
            setShouldUpdateIndex(false);
            setIsLoading(false);
        }
    }, [colors]);

    if (isLoading) {
        return <LinearProgress color="success" />
    }


    return (
        <Box>
            {tasks && tasks[currentTaskIndex] && (
                <>
                    <Typography variant="h4">
                        {tasks[currentTaskIndex].question}
                    </Typography>
                    <Card variant="h6">
                        <Button onClick={handleClick} style={{ backgroundColor: colors.answer1 }}>
                            {tasks[currentTaskIndex].answer1}
                        </Button>
                        <Button onClick={handleClick} style={{ backgroundColor: colors.answer2 }}>
                            {tasks[currentTaskIndex].answer2}
                        </Button>
                        <Button onClick={handleClick} style={{ backgroundColor: colors.answer3 }}>
                            {tasks[currentTaskIndex].answer3}
                        </Button>
                    </Card>
                    <Box>

                    </Box>
                    {clicked &&
                        <>
                            {currentTaskIndex > 0 &&
                                <Button onClick={handlePrevious}>
                                    Previous
                                </Button>}
                            {currentTaskIndex < tasks.length - 1 && <Button onClick={handleNext}>
                                Next
                            </Button>}
                        </>}
                </>
            )}
        </Box>
    )
}

export default QnA