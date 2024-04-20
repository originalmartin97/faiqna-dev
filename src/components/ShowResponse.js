import React from 'react';
import { useLatestResponse } from '../hooks/useApp';
import { GeneralCard } from './mui';


const ShowResponse = () => {
    const response = useLatestResponse();
    
    // Split the response into lines and map each line to a JSX element
    const responseLines = response ? (
        <GeneralCard>
            {response.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </GeneralCard>
    ) : null;

    return responseLines
};

export default ShowResponse;
