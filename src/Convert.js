import React, { useState } from 'react';


const Convert = (props) => {
    const [unit, setUnit] = useState('celsius');

    function showFahrenheit(event) {
        event.preventDefault();
        setUnit('fahrenheit');
    }

    function showCelsius(event) {
        event.preventDefault();
        setUnit('celsius');
    }


    function fahrenheit() {
        return (props.celsius * 9 / 5) + 32;
    }

    if (unit === 'celsius') {
        return (
            <div className="card-text d-flex">
                <span>
                    <h1>{Math.round(props.celsius)}</h1>
                </span>
                <span className="units d-flex">
                    <a href="/" onClick={showFahrenheit}>
                        <h5>°C</h5>
                    </a>
                    |
                    <h5>°F</h5>
                </span>
            </div>
        );
    } else {
        return (
            <div className="card-text d-flex">
                <span>
                    <h1>{Math.round(fahrenheit())}</h1>
                </span>
                <span className="units d-flex">
                    <h5>°C</h5>
                    |
                    <a href="/" onClick={showCelsius}>
                        <h5>°F</h5>
                    </a>
                </span>
            </div>
        );
    }
};

export default Convert;