import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherHour(props) {
    const [loaded, setLoaded] = useState(false);
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        setLoaded(false);

        const apiKey = "597c40c39084687093b091cd48b366f8";
        const lon = props.coord ? props.coord.lon : 0; // Use provided coordinates or default to 0
        const lat = props.coord ? props.coord.lat : 0; // Use provided coordinates or default to 0
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl).then(handleResponse);
    }, [props.coord]);

    function handleResponse(response) {
        setForecast(response.data.hourly);
        setLoaded(true);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const hour = date.toLocaleString("en-US", { hour: "numeric", hour12: true });


        return (
            <div>
                {hour}
            </div>
        );
    }

    if (loaded) {
        return (
            <div className="container border-bottom mt-4 rounded-0 ">
                <div className="row">Hourly</div >
                <div className="row m-0 p-0 grid gap-2 my-5 ">
                    {forecast.slice(0, 8).map((hourlyForecast, index) => (
                        <div key={index} className="col border light-subtle rounded shadow-sm text-center">
                            <p>{formatDate(hourlyForecast.dt)}</p>
                            <img
                                src={`https://openweathermap.org/img/w/${hourlyForecast.weather[0].icon}.png`}
                                alt={hourlyForecast.weather[0].description}
                            />
                            <p>{Math.round(hourlyForecast.temp)}&deg;</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return null;
    }
}
