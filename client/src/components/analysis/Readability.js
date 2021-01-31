import React from 'react';
import * as RS from 'text-readability'


const Readability = ({word}) => {
    const readability_scores = []
    const frs = RS.fleschReadingEase(word)
    const frsg = RS.fleschReadingEaseToGrade(word)
    const difficultWords = RS.difficultWords(word)
    return (
        <div>
            <div>
                <p>frs</p>
                <p>{frs}</p>
                <p>frsg</p>
                <p>{frsg}</p>
            </div>
        </div>
    )
}

export default Readability;
