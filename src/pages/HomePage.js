import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/dashboard');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome, visitor!</h1>
            <button onClick={handleButtonClick}>Let's start</button>
        </div>
    );
};

export default HomePage;