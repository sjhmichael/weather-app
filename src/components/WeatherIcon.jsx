import React, { Component } from 'react'
import Clouds from "../assets/Clouds.png"
import Drizzle from "../assets/Drizzle.png"
import Fog from "../assets/Fog.png"
import Rain from "../assets/Rain.png"
import Snow from "../assets/Snow.png"
import Clear from "../assets/Clear.png"
import Thunderstorm from "../assets/Thunderstorm.png"
import Wind from "../assets/Wind.png"
import CloudsDark from "../assets/CloudsDark.png"
import ClearDark from "../assets/ClearDark.png"
import DrizzleDark from "../assets/DrizzleDark.png"
import SnowDark from "../assets/SnowDark.png"
import RainDark from "../assets/RainDark.png"

// Define an object to map image names to image components
// weathericons light
const weatherIcons = {
    Clouds: <img src={Clouds} alt="Clouds" />,
    Drizzle: <img src={Drizzle} alt="Drizzle" />,
    Fog: <img src={Fog} alt="Fog" />,
    Rain: <img src={Rain} alt="Rain" />,
    Snow: <img src={Snow} alt="Snow" />,
    Clear: <img src={Clear} alt="Clear" />,
    Thunderstorm: <img src={Thunderstorm} alt="Thunderstorm" />,
    Wind: <img src={Wind} alt="Wind" />,
}
// weathericons dark
const weatherIconsDark = {
    Clouds: <img src={CloudsDark} alt="Clouds" />,
    Drizzle: <img src={DrizzleDark} alt="Drizzle" />,
    Fog: <img src={Fog} alt="Fog" />,
    Rain: <img src={RainDark} alt="Rain" />,
    Snow: <img src={SnowDark} alt="Snow" />,
    Clear: <img src={ClearDark} alt="Clear" />,
    Thunderstorm: <img src={Thunderstorm} alt="Thunderstorm" />,
    Wind: <img src={Wind} alt="Wind" />,
}

const WeatherIcon = ({ weatherType }) => {
    
    return (
        <div className="py-10 w-[256] h-[256]">
            <div className="hidden dark:block">
                {weatherIconsDark[weatherType]}
            </div>
            <div className="block dark:hidden">
                {weatherIcons[weatherType]}
            </div>
        </div>
    )
}

export default WeatherIcon