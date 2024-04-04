import React from 'react'
import CityTime from './CityTime'
import WeatherIcon from './WeatherIcon';

const ClockDashboard = () => {

    const cities = [
        { name: "Tokyo", timezone: "Asia/Tokyo" },
        { name: "Singapore", timezone: "Asia/Singapore" },
        { name: "London", timezone: "Europe/London" },
        { name: "Amsterdam", timezone: "Europe/Amsterdam", },
    ];

    return (
        <div name="world-clock">
            <ul name="cities">
                {cities.map((city, index) => (
                    <CityTime city={city} key ={index}/>
                ))}
            </ul>
        </div>
    )
}

export default ClockDashboard