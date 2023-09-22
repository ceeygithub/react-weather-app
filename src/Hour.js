import React from "react";


const Hour = () => {
    return (
        <div className="container border-bottom mt-4 rounded-0 " id="forecast">
            <p className="weather">Hourly</p>
            <div className="row m-0 p-0 grid gap-2 my-5 ">
                <div className="col border light-subtle  rounded shadow-sm text-center ">
                    <p>4 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm text-center">
                    <p>5 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm  text-center">
                    <p>6 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm text-center">
                    <p>7 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm text-center">
                    <p>8 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm text-center">
                    <p>9 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm text-center">
                    <p>10 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
                <div className="col border light-subtle rounded shadow-sm text-center">
                    <p>11 AM</p>
                    <img
                        src={require("./images/rainy-day.png")}
                        alt="weather png"
                        width="100px"
                        className="px-4"
                    />
                    <p>25&deg;</p>
                </div>
            </div>
        </div>
    )
}

export default Hour