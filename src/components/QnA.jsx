import React, { useState, useEffect } from 'react'
import useStore from '../store'
import { Button, Card, LinearProgress, Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles';


const QnA = ({ lines, appBarHeight }) => {
    const defaultColor = { backgroundColor: '#2D6A51', color: 'black' };
    const theme = useTheme();

    const { isLoading, setIsLoading } = useStore();

    const [clicked, setClicked] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [coloredIndices, setColoredIndices] = useState([]);
    const [shouldUpdateIndex, setShouldUpdateIndex] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const [colors, setColors] = useState({
        answer1: defaultColor,
        answer2: defaultColor,
        answer3: defaultColor,
    });
    const tasks = lines || [];

    const colorAnswers = (index) => {
        setColors({
            answer1: tasks[index]?.answer1?.includes('*') ? { backgroundColor: '#a1f5ce', color: 'black' } : { backgroundColor: '#c57d83', color: 'black' },
            answer2: tasks[index]?.answer2?.includes('*') ? { backgroundColor: '#a1f5ce', color: 'black' } : { backgroundColor: '#c57d83', color: 'black' },
            answer3: tasks[index]?.answer3?.includes('*') ? { backgroundColor: '#a1f5ce', color: 'black' } : { backgroundColor: '#c57d83', color: 'black' },
        });
    }
    useEffect(() => {
        setCurrentTaskIndex(0, () => {
            setColors({
                answer1: defaultColor,
                answer2: defaultColor,
                answer3: defaultColor,
            });
        });
        setColoredIndices([]);
    }, [lines]);

    useEffect(() => {
        setColors({
            answer1: defaultColor,
            answer2: defaultColor,
            answer3: defaultColor,
        });
        setCurrentTaskIndex(0);
    }, [lines]);

    const handleClick = () => {
        colorAnswers(currentTaskIndex);
        setClicked(true);
        setIsAnswered(true);
        setColoredIndices(prevIndices => [...prevIndices, currentTaskIndex]);
    }

    const handleNext = () => {
        if (currentTaskIndex < tasks.length - 1) {
            setIsLoading(true);
            setShouldUpdateIndex(true);
            setClicked(false);
            setIsAnswered(false);
            if (coloredIndices.includes(currentTaskIndex + 1)) {
                colorAnswers(currentTaskIndex + 1);
            } else {
                setColors({
                    answer1: defaultColor,
                    answer2: defaultColor,
                    answer3: defaultColor,
                });
            }
        }
    }

    const handlePrevious = () => {
        if (currentTaskIndex > 0) {
            setIsLoading(true);
            let newIndex = currentTaskIndex - 1;
            setCurrentTaskIndex(newIndex);
            setClicked(true);
            setIsAnswered(false);
            if (coloredIndices.includes(newIndex)) {
                colorAnswers(newIndex);
            } else {
                setColors({
                    answer1: defaultColor,
                    answer2: defaultColor,
                    answer3: defaultColor,
                });
            }
            setIsLoading(false);
        }
    }

    const handleReset = () => {
        setColors({
            answer1: defaultColor,
            answer2: defaultColor,
            answer3: defaultColor,
        });
        setCurrentTaskIndex(0);
        setClicked(false);
        setIsAnswered(false);
        setColoredIndices([]);
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
        <Grid container direction="row" justifyContent="space-between" style={{ height: `calc(100% - 2* ${appBarHeight}px)`, position: 'relative', paddingBottom: '50px' }}>
            <Grid item>
                {tasks && tasks[currentTaskIndex] && (
                    <Typography variant="h4"
                        align="center"
                        style={{
                            textAlignLast: 'justify',
                            fontWeight: 'bold'
                        }}
                        sx={{
                            padding: '1rem',
                        }}>
                        {tasks[currentTaskIndex].question}
                    </Typography>
                )}
            </Grid>
            <Grid item>
                {tasks && tasks[currentTaskIndex] && (
                    <Card variant="h6"
                        sx={{
                            padding: 0,
                        }}
                    >
                        <Button
                            onClick={handleClick}
                            style={colors.answer1}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#a1f5ce';
                                e.currentTarget.style.color = 'black';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = colors.answer1.backgroundColor;
                                e.currentTarget.style.color = colors.answer1.color;
                            }}
                        >
                            {tasks[currentTaskIndex].answer1}
                        </Button>
                        <Button
                            onClick={handleClick}
                            style={colors.answer2}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#a1f5ce';
                                e.currentTarget.style.color = 'black';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = colors.answer2.backgroundColor;
                                e.currentTarget.style.color = colors.answer2.color;
                            }}
                        >
                            {tasks[currentTaskIndex].answer2}
                        </Button>
                        <Button
                            onClick={handleClick}
                            style={colors.answer3}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#a1f5ce';
                                e.currentTarget.style.color = 'black';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = colors.answer3.backgroundColor;
                                e.currentTarget.style.color = colors.answer3.color;
                            }}
                        >
                            {tasks[currentTaskIndex].answer3}
                        </Button>
                    </Card>
                )}
            </Grid>
            <Grid item container justifyContent="space-between">
                <>
                    <Grid item>
                        <Button disabled={currentTaskIndex === 0} onClick={handlePrevious}>
                            Previous
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={currentTaskIndex >= tasks.length - 1} onClick={handleNext}>
                            Next
                        </Button>
                    </Grid>
                </>
            </Grid>
            <Grid item container justifyContent="center" alignItems="flex-end" style={{ flexGrow: 1 }}>
                <Button onClick={handleReset}>
                    Reset
                </Button>
            </Grid>
        </Grid>
    )
}

export default QnA