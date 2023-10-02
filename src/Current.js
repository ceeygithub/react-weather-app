import React, { useState, useEffect } from "react";
import axios from "axios";
import Convert from "./Convert.js";
import WeatherForecast from "./WeatherForecast.js";
import WeatherHour from "./WeatherHour.js";
import { ThreeDots } from 'react-loader-spinner'




const Current = ({ weatherData }) => {
    if (!weatherData) {
        return <div>Loading
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#0d6efd"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>;
    }

    const {

        city,
        temperature,
        humidity,
        visibility,
        wind,
        description,
        icon,
        formattedTime,
        dew,
    } = weatherData;

    return (
        <div className="current-weather">
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
                                    {formattedTime}
                                </h6>
                                <div className="card-text d-flex">

                                    <Convert celsius={temperature} />
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

const Search = ({ onCityChange }) => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiKey = "597c40c39084687093b091cd48b366f8";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const {
                coords: coord,
                name: city,
                main: { temp: temperature, humidity },
                visibility: visibilityMeters,
                wind: { speed: wind },
                weather,
                dt: timestamp,
                timezone,
            } = response.data;

            const visibility = visibilityMeters / 1000;
            const formattedTime = formatTime(timestamp, timezone);
            const dew = calculateDewPoint(temperature, humidity);

            const weatherData = {
                coord,
                city,
                temperature,
                humidity,
                visibility,
                wind,
                description: weather[0].description,
                icon: weather[0].icon,
                formattedTime,
                dew,
            };

            setWeatherData(weatherData);

            // Pass the searched city to the parent component
            onCityChange(city);
            // handle successful response
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error("API rate limit exceeded. Retrying in a moment...");
                // Retry after an increasing delay (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                await axios.get(url); // Retry the request
            } else {
                console.error("Error fetching weather data:", error);
            }
        }
    };


    useEffect(() => {
        // Fetch initial weather data when the component mounts
        // For example, you can use geolocation to get the current city's weather

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const apiKey = "597c40c39084687093b091cd48b366f8";
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                axios.get(apiUrl).then((response) => {
                    const {
                        coords: coord,
                        name: city,
                        main: { temp: temperature, humidity },
                        visibility: visibilityMeters,
                        wind: { speed: wind },
                        weather,
                        dt: timestamp,
                        timezone,
                    } = response.data;

                    const visibility = visibilityMeters / 1000;
                    const formattedTime = formatTime(timestamp, timezone);
                    const dew = calculateDewPoint(temperature, humidity);

                    const weatherData = {
                        city,
                        temperature,
                        humidity,
                        visibility,
                        wind,
                        description: weather[0].description,
                        icon: weather[0].icon,
                        formattedTime,
                        dew,
                        coord,
                    };

                    setWeatherData(weatherData);
                })
                    .catch((error) => {
                        if (error.response && error.response.status === 429) {
                            // Handle 429 error (rate limit exceeded)
                            console.error("API rate limit exceeded. Please try again later.");
                        } else {
                            // Handle other errors
                            console.error("Error fetching data:", error.message);
                        }
                    });
            });
        }
    }, [onCityChange]);


    const formatTime = (timestamp, timezone) => {
        const currentTime = new Date((timestamp + timezone) * 1000);
        const options = {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            hour12: true,
            timeZone: 'UTC',
        };
        return currentTime.toLocaleString('en-US', options);
    };


    const calculateDewPoint = (temperature, humidity) => {
        return temperature - ((100 - humidity) / 5);
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
            <Current weatherData={weatherData} />
            {weatherData && <WeatherHour coords={weatherData.coord} />}
            {weatherData && <WeatherForecast coords={weatherData.coord} />}
        </div>

    );
};
export default Search;

