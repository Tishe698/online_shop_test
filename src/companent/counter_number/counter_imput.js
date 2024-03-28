// CounterInput.js
import React, { useState } from 'react';
import './counter_style.css';
function CounterInput({ onChange }) {
    const [value, setValue] = useState(1); // Start from 1 pair

    const handleChange = (event) => {
        const inputValue = parseInt(event.target.value) || 0;
        setValue(inputValue);
        onChange(inputValue);
    };

    const increment = () => {
        setValue(value + 1);
        onChange(value + 1);
    };

    const decrement = () => {
        if (value > 1) {
            setValue(value - 1);
            onChange(value - 1);
        }
    };

    return (
        <div className="counter-input">
            <div className="input-container">
                <button className="counter_button_left" onClick={decrement}>-</button>
                <input
                    className="counter-value"
                    type="number"
                    placeholder="1"
                    value={value}
                    onChange={handleChange}
                    min={1}
                    max={10}
                    inputMode="numeric"
                />
                <span className="unit">шт.</span>
                <button className="counter-button" onClick={increment}>+</button>
            </div>
        </div>
    );
}

export default CounterInput;