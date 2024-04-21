import React from 'react';
import { useLatestResponse } from '../hooks/useApp';


const ShowResponse = () => {
    const response = useLatestResponse();
    
    // Split the response into lines and map each line to a JSX element
    const responseLines = response ? (
        <div>
            {response.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </div>
    ) : null;

    return responseLines
};

export default ShowResponse;
