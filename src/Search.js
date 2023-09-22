import React, { useState } from "react";
import axios from "axios";

export default function Search() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const apiKey = "597c40c39084687093b091cd48b366f8";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios
            .get(url)
            .then((response) => {
                const weatherData = parseWeatherData(response.data);
                setWeatherData(weatherData);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    };

    const parseWeatherData = (data) => {
        const {
            main: { temp: temperature, humidity },
            wind: { speed: wind },
            weather,
            dt: timestamp,
            timezone,
        } = data;

        const formattedTime = formatTime(timestamp, timezone);
        const visibility = data.visibility / 1000;
        const dew = calculateDewPoint(temperature, humidity);
        const description = weather[0].description;
        const icon = weather[0].icon;

        return {
            temperature,
            humidity,
            wind,
            description,
            icon,
            formattedTime,
            visibility,
            dew,
        };
    };

    const formatTime = (timestamp, timezone) => {
        const currentTime = new Date((timestamp + timezone) * 1000);
        return currentTime.toLocaleString();
    };

    const calculateDewPoint = (temperature, humidity) => {
        return temperature - (100 - humidity) / 5;
    };

    return (
        <div>
            <div className="container-fluid border-bottom">
                <form className="d-flex my-4" role="search" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Enter city"
                        aria-label="Search"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-primary" type="submit">
                        Search
                    </button>
                </form>
            </div>

            {weatherData && (
                <div className="current-weather">
                    <div className="container border-bottom">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 my-5">
                            <div className="col">
                                <img
                                    src={`https://openweathermap.org/img/w/${weatherData.icon}.png`}
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
                                            {weatherData.formattedTime} {/* Render the formatted time */}
                                        </h6>
                                        <div className="card-text d-flex">
                                            <span>
                                                <h1>{weatherData.temperature}</h1>
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
                                        <h6>{weatherData.description}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-tertiary bg-transparent text-reset">
                                    <div className="card-body">
                                        <h5 className="card-title">Humidity</h5>
                                        <h6 className="card-subtitle mb-2 text-body-tertiary">
                                            {weatherData.humidity}%
                                        </h6>
                                        <h5 className="card-title">Wind</h5>
                                        <h6 className="card-subtitle mb-2 text-body-tertiary">
                                            {weatherData.wind} km/h
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-tertiary bg-transparent text-reset">
                                    <div className="card-body">
                                        <h5 className="card-title">Visibility</h5>
                                        <h6 className="card-subtitle mb-2 text-body-tertiary">
                                            {weatherData.visibility} km
                                        </h6>
                                        <h5 className="card-title">Dew point</h5>
                                        <h6 className="card-subtitle mb-2 text-body-tertiary">
                                            {weatherData.dew.toFixed(2)}°&deg;
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
