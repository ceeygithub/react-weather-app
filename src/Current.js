import React, { useState, useEffect } from "react";
import axios from "axios";

const Current = ({ data }) => {
    const [weatherData, setWeatherData] = useState(null);

    // Function to calculate Dew Point
    const calculateDewPoint = (temperature, humidity) => {
        return temperature - ((100 - humidity) / 5);
    };

    useEffect(() => {
        const getWeatherData = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const apiKey = "597c40c39084687093b091cd48b366f8";
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                axios.get(apiUrl).then((response) => {
                    const {
                        name: city,
                        main: { temp: temperature, humidity },
                        visibility: visibilityMeters,
                        wind: { speed: wind },
                        weather,
                        dt: timestamp,
                        timezone,
                    } = response.data;

                    const visibility = visibilityMeters / 1000; // Convert visibility to kilometers
                    const timezoneOffset = timezone * 3600; // Timezone offset in seconds
                    const currentTime = new Date((timestamp + timezoneOffset) * 1000);
                    const dew = calculateDewPoint(temperature, humidity);

                    setWeatherData({
                        city,
                        temperature,
                        humidity,
                        visibility,
                        wind,
                        description: weather[0].description,
                        icon: weather[0].icon,
                        timestamp,
                        timezoneOffset,
                        currentTime,
                        dew,
                    });
                });
            });
        };

        // Call the function to fetch weather data when the component is mounted
        getWeatherData();
    }, []);

    if (!weatherData) {
        // Render a loading indicator or return null while data is being fetched
        return <div>Loading...</div>;
    }

    const {
        city,
        temperature,
        humidity,
        visibility,
        wind,
        description,
        icon,
        currentTime,
        dew,
    } = weatherData;

    // Check if currentTime is null before accessing its properties
    const formattedTime = currentTime ? currentTime.toLocaleString() : "N/A";

    return (
        <div className="current-weather">
            <p className="weather">Current Weather</p>
            <div className="container border-bottom rounded-0">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 my-5">
                    <div className="col">
                        <img
                            src={`https://openweathermap.org/img/w/${icon}.png`}
                            alt="weather png"
                            width="200px"
                            className="px-4"
                        />
                    </div>
                    <div className="col">
                        <div className="card bg-tertiary bg-transparent text-reset">
                            <div className="card-body">
                                <h4 className="card-title">
                                    <strong>{city}</strong>
                                </h4>
                                <h6 className="card-subtitle" id="time-card">
                                    {formattedTime} {/* Render the formatted time */}
                                </h6>
                                <div className="card-text d-flex">
                                    <span>
                                        <h1>{temperature}</h1>
                                    </span>
                                    <span className="units d-flex">
                                        <a href="/" className="active">
                                            <h5>°C</h5>
                                        </a>
                                        |
                                        <a href="/" id="toggle-fahrenheit">
                                            <h5>°F</h5>
                                        </a>
                                    </span>
                                </div>
                                <h6>{description}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-tertiary bg-transparent text-reset">
                            <div className="card-body">
                                <h5 className="card-title">Humidity</h5>
                                <h6 className="card-subtitle mb-2 text-body-tertiary">
                                    {humidity}%
                                </h6>
                                <h5 className="card-title">Wind</h5>
                                <h6 className="card-subtitle mb-2 text-body-tertiary">
                                    {wind} km/h
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-tertiary bg-transparent text-reset">
                            <div className="card-body">
                                <h5 className="card-title">Visibility</h5>
                                <h6 className="card-subtitle mb-2 text-body-tertiary">
                                    {visibility} km
                                </h6>
                                <h5 className="card-title">Dew point</h5>
                                <h6 className="card-subtitle mb-2 text-body-tertiary">
                                    {dew.toFixed(2)}°&deg;
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Current;
