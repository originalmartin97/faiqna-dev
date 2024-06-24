// Importing necessary libraries and hooks
import React, { useState, useEffect } from 'react'
import useStore from '../store'
import { Button, Card, LinearProgress, Typography, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// QnA component
const QnA = ({ lines, appBarHeight }) => {
    // Default color for answers
    const defaultColor = { backgroundColor: '#2D6A51', color: 'black' };
    // Using theme for responsive design
    const theme = useTheme();
    // Checking if the screen size is small
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Loading state from the store
    const { isLoading, setIsLoading } = useStore();

    // State variables
    const [clicked, setClicked] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [coloredIndices, setColoredIndices] = useState([]);
    const [shouldUpdateIndex, setShouldUpdateIndex] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    // Colors for the answers
    const [colors, setColors] = useState({
        answer1: defaultColor,
        answer2: defaultColor,
        answer3: defaultColor,
    });

    // Tasks from the props
    const tasks = lines || [];

    // Function to reset colors
    const resetColors = () => {
        setColors({
            answer1: defaultColor,
            answer2: defaultColor,
            answer3: defaultColor,
        });
    }

    // Function to color answers based on the index
    const colorAnswers = (index) => {
        if (index >= 0 && index < tasks.length) {
            setColors({
                answer1: tasks[index]?.answer1?.includes('*') ? { backgroundColor: '#a1f5ce', color: 'black' } : { backgroundColor: '#c57d83', color: 'black' },
                answer2: tasks[index]?.answer2?.includes('*') ? { backgroundColor: '#a1f5ce', color: 'black' } : { backgroundColor: '#c57d83', color: 'black' },
                answer3: tasks[index]?.answer3?.includes('*') ? { backgroundColor: '#a1f5ce', color: 'black' } : { backgroundColor: '#c57d83', color: 'black' },
            });
        }
    }

    // Effect to reset the state when lines prop changes
    useEffect(() => {
        setCurrentTaskIndex(0);
        resetColors();
        setColoredIndices([]);
    }, [lines]);

    // Function to handle click on an answer
    const handleClick = (answerNumber) => {
        colorAnswers(currentTaskIndex);
        setClicked(true);
        setIsAnswered(true);
        setColoredIndices(prevIndices => [...prevIndices, currentTaskIndex]);
    }

    // Function to handle next button click
    const handleNext = () => {
        if (currentTaskIndex < tasks.length - 1) {
            setIsLoading(true);
            setShouldUpdateIndex(true);
            setClicked(false);
            setIsAnswered(false);
            if (coloredIndices.includes(currentTaskIndex + 1)) {
                colorAnswers(currentTaskIndex + 1);
            } else {
                resetColors();
            }
        }
    }

    // Function to handle previous button click
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
                resetColors();
            }
            setIsLoading(false);
        }
    }

    // Function to handle reset button click
    const handleReset = () => {
        resetColors();
        setCurrentTaskIndex(0);
        setClicked(false);
        setIsAnswered(false);
        setColoredIndices([]);
    }

    // Effect to update the current task index
    useEffect(() => {
        if (shouldUpdateIndex) {
            setCurrentTaskIndex(currentTaskIndex + 1);
            setShouldUpdateIndex(false);
            setIsLoading(false);
        }
    }, [colors]);

    // If loading, show a progress bar
    if (isLoading) {
        return <LinearProgress color="success" />
    }

    // Render the QnA component
    return (
        // Grid layout for the component
        <Grid container direction="row" justifyContent="space-between" style={{ height: `calc(100% - 2* ${appBarHeight}px)`, position: 'relative', paddingBottom: '50px' }}>
            {/* Question section */}
            <Grid item>
                {tasks && tasks[currentTaskIndex] && (
                    <Typography variant={isSmallScreen ? "h6" : "h4"}
                        align="justify"
                        style={{
                            textAlignLast: 'center',
                            fontWeight: 'bold'
                        }}
                        sx={{
                            padding: 0,
                        }}>
                        {tasks[currentTaskIndex].question}
                    </Typography>
                )}
            </Grid>
            {/* Answer section */}
            <Grid container justifyContent="center">
                {tasks && tasks[currentTaskIndex] && (
                    <Card variant="h6"
                        justifyContent="center"
                        sx={{
                            padding: 0,
                            justifyContent: "center"
                        }}
                    >
                        {/* Answer buttons */}
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
                            sx={{ fontSize: isSmallScreen ? '0.7rem' : '1rem' }}
                        >
                            {tasks[currentTaskIndex].answer1.replace('*', '')}
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
                            sx={{ fontSize: isSmallScreen ? '0.7rem' : '1rem' }}
                        >
                            {tasks[currentTaskIndex].answer2.replace('*', '')}
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
                            sx={{ fontSize: isSmallScreen ? '0.7rem' : '1rem' }}
                        >
                            {tasks[currentTaskIndex].answer3.replace('*', '')}
                        </Button>
                    </Card>
                )}
            </Grid>
            {/* Navigation buttons */}
            <Grid item container justifyContent="space-between">
                <>
                    <Grid item>
                        <Button
                            disabled={currentTaskIndex === 0}
                            onClick={handlePrevious}
                            sx={{
                                width: isSmallScreen ? "80px" : "100px",
                                fontSize: isSmallScreen ? '0.7rem' : '1rem'
                            }}
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={currentTaskIndex >= tasks.length - 1}
                            onClick={handleNext}
                            sx={{
                                width: isSmallScreen ? "80px" : "100px",
                                fontSize: isSmallScreen ? '0.7rem' : '1rem'
                            }}
                        >
                            Next
                        </Button>
                    </Grid>
                </>
            </Grid>
            {/* Reset button */}
            <Grid item container justifyContent="center" alignItems="flex-end" style={{ flexGrow: 1 }}>
                <Button
                    onClick={handleReset}
                    sx={{
                        backgroundColor: "#99bdb1",
                        color: "black",
                        "&:hover": { backgroundColor: "#c57d83" },
                        padding: isSmallScreen ? '0.5rem' : '1rem',
                        fontSize: isSmallScreen ? '0.7rem' : '1rem'
                    }}
                >
                    Reset
                </Button>
            </Grid>
        </Grid>
    )
}

// Exporting the QnA component
export default QnA