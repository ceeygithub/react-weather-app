


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherForecast(props) {
    const [loaded, setLoaded] = useState(false);
    const [forecast, setForecast] = useState([]);


    useEffect(() => {
        setLoaded(false);

    }, [props.coords]);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);

    }


    const apiKey = "597c40c39084687093b091cd48b366f8";
    const lon = props.coord ? props.coord.lon : 0; // Use provided coordinates or default to 0
    const lat = props.coord ? props.coord.lat : 0; // Use provided coordinates or default to 0
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const month = date.toLocaleDateString("en-US", { month: "numeric" });
        const dayOfMonth = date.toLocaleDateString("en-US", { day: "numeric" });

        return (
            <div>
                {day}
                <br />
                {`${month}/${dayOfMonth}`}
            </div>
        );
    }

    if (loaded) {
        return (
            <div className="row border-bottom ">
                <p>Next five days</p>
                {forecast.slice(0, 5).map((dailyForecast, index) => (
                    <div className="row" key={index}>
                        <div className="WeatherForecastDay">
                            <div className="row border-bottom border-top ">
                                <div className="col  ">
                                    {formatDate(dailyForecast.dt)}
                                </div>
                                <div className="col">
                                    <img
                                        src={`https://openweathermap.org/img/w/${dailyForecast.weather[0].icon}.png`}
                                        alt={dailyForecast.weather[0].description}
                                    />
                                </div>
                                <div className="col">
                                    {Math.round(dailyForecast.temp.min)}&deg;<br />
                                    Low
                                </div>
                                <div className="col">
                                    {Math.round(dailyForecast.temp.max)}&deg;<br />
                                    High
                                </div>
                                <div className="col">
                                    {Math.round(dailyForecast.wind_speed)} km/h<br />
                                    Wind
                                </div>
                                <div className="col">
                                    {dailyForecast.rain ? dailyForecast.rain.toFixed(1) : "0"} mm<br />
                                    Rain
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}
