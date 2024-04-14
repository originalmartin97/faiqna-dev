import React, { useState } from 'react';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: ''});

async function generateResponse(prompt) {
  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt: prompt,
    max_tokens: 60,
  });

  return response.choices[0].text.trim();
}

export const Response = () => {
    const [response, setResponse] = useState('');

    const handleClick = async () => {
        const generatedResponse = await generateResponse('What is today date?');
        setResponse(generatedResponse);
    };

    return (
        <div>
            <h1>Response</h1>
            <button onClick={handleClick}>Get Response</button>
            <p>{response}</p>
        </div>
    );
};

export default Response;