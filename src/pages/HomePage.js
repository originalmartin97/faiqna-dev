import React from 'react';
import { MySignIn, MySignOut } from '../components/Auth';
import { AppFront, GeneralPaper }from '../components/mui';

const HomePage = () => {
    return (
        <AppFront>
            <GeneralPaper>
            <h1>Welcome, visitor!</h1>
            <MySignIn />
            <MySignOut />
            </GeneralPaper>
        </AppFront>
    )
};

export default HomePage;