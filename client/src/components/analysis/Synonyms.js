import React from 'react';
import synonyms from 'synonyms';

const Synonyms = ({word}) => {
    const listSynonyms = synonyms({word})
    return (
        <div>
            {listSynonyms}
        </div>
    )
}

export default Synonyms;