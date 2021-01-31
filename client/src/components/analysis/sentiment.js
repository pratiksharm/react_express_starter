import React from 'react';
import analyse from 'simple-sentiment-lib';

const SentimentAnalysis = ({word}) => {
    const analysis = analyse(word);
    console.log(analysis)
    return (
        <div>
            
        </div>

    )
    
}