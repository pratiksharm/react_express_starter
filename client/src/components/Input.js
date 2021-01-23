import React, { useState } from 'react';


function InputRange() {
    const [value, setValue] = useState(0);
    const valueList= [69, 100, 150, 200, 250, 300, 365]
    return (
    <div class="container">
        <div>{value}</div>
        <input type="range" min="0" max="6" step="1"  onChange={({target}) => setValue(valueList[target.value])} />
    </div>

    )
}

export default InputRange;


