import React, { useState } from 'react';
import './counter_style.css';

function CounterInput({ onChange }) {
    const [value, setValue] = useState(1); // Default to 1 pair

    // Ensure the value is valid and set it
    const handleChange = (event) => {
        const newValue = Math.max(1, parseInt(event.target.value, 10) || 1); // Ensure at least 1
        setValue(newValue);
        if (onChange) onChange(newValue);
    };

    // Increment the value
    const increment = () => {
        const newValue = value + 1;
        setValue(newValue);
        if (onChange) onChange(newValue);
    };

    // Decrement the value if greater than 1
    const decrement = () => {
        if (value > 1) {
            const newValue = value - 1;
            setValue(newValue);
            if (onChange) onChange(newValue);
        }
    };

    return (
        <div className="counter-input">
            <div className="input-container">
                <button
                    className="counter-button decrement"
                    onClick={decrement}
                    aria-label="Decrement">
                    -
                </button>
                <input
                    className="counter-value"
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    inputMode="numeric"
                    aria-label="Counter Value"
                />
                <span className="unit">шт.</span>
                <button
                    className="counter-button increment"
                    onClick={increment}
                    aria-label="Increment">
                    +
                </button>
            </div>
        </div>
    );
}

export default CounterInput;
