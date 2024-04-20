import React from 'react';
import InputFile from '../components/InputFile';
import ShowResponse from '../components/ShowResponse';
import { AppFront, GeneralPaper} from '../components/mui'; // Replace with the actual path to mui.js

function Dashboard() {
    return (
      <AppFront>
        <GeneralPaper>
            <InputFile />
            <ShowResponse />
        </GeneralPaper>
      </AppFront>
    );
  }

export default Dashboard;