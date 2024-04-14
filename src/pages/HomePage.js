import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralButton } from '../components/mui';

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/dashboard');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome, visitor!</h1>
            <GeneralButton onClick={handleButtonClick}>Let's start</GeneralButton>
        </div>
    );
};

export default HomePage;