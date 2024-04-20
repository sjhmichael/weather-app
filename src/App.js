import React from "react";
import axios from "axios";
import { FaBars } from 'react-icons/fa'
import { useState, useEffect } from "react";
import Arrow from "./assets/Arrow.svg"
import Navbar from "./components/Navbar";
import WeatherIcon from "./components/WeatherIcon";
import moment from "moment-timezone";

function App() {
  const [data, setData] = useState({})
  const [time, setTime] = useState(new Date())
  const [selectedCountry, setSelectedCountry] = useState('Singapore')
  const [timeZone, setTimezone] = useState('Asia/Singapore')
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const day = time.getDay()
  let timer = new Date()
  const [dark, setDark] = useState()
  const { getCode } = require('country-list')

  const formattedTime = time.toLocaleTimeString("en-GB",
    {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })

  let timeParts = formattedTime.split(":") // Split the string by colon
  let hours = parseInt(timeParts[0]) // Parse the hours part as an integer

  //updates time every 1 second
  useEffect(() => {
    timer = setInterval(() => { setTime(new Date()) }, 1000)
    return () => { clearInterval(timer) }
  }, []);

  //ensures api is updated with selectedcountry when it changes or every 5 minutes
  useEffect(() => {
    const fetchData = () => {
      setData('')
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&units=metric&appid=69dcd79eb09537f9016918125b17e1fb`;
      axios.get(url)
        .then((response) => { setData(response.data) })
        .catch((error) => { console.error("Error fetching data: ", error) })
    }

    fetchData()
    //update weather data every 5 minutes
    const updateCountry = setInterval(fetchData, 300000)

    return () => clearInterval(updateCountry)

  }, [selectedCountry])

  //handles selected country change
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value)

    //changes timezone based on the country selected
    const countryCode = getCode(selectedOption.value) //get country code from countryname


  }

  //handles selected timezone change if manually selected
  const handleTimezoneChange = (selectedOption) => {
    setTimezone(selectedOption.value)
  }

  //handles darkmode settings
  useEffect(() => {
    //set dark mode if hours are between 9 and 18
    if (hours >= 8 && hours <= 17) {
      setDark(true)
    }
    else {
      setDark(false)
    }
  }, [time])

  //console.log(getCode('Canada')); // IS

  return (
    <div className={!dark ? "dark" : ""}>
      <div name="container" className="w-full h-[100vh] relative bg-stone-50 dark:bg-slate-800">

        <div name="searchBar" className="flex flex-row justify-between p-6 items-center text-neutral-900 dark:text-neutral-200">
          <FaBars size={24} />

          <div name="location" className="text-xl font-medium tracking-[0.2em]">
            <h1>{selectedCountry.toUpperCase()}</h1>
          </div>

          <Navbar onCountryChange={handleCountryChange} onTimezoneChange={handleTimezoneChange} />
        </div>

        <div name="container" className="sm:max-w-[700px] h-[700px] m-auto relative top-2 flex flex-col justify-col px-6 text-neutral-900 dark:text-neutral-200">

          {/* top */}
          <div name="top" className="w-full mx-auto font-normal text-center flex flex-col items-center">

            <div name="description" className="relative text-2xl font-medium tracking-[0.2em]">
              {data.main ? <h1>{data.weather[0].main.toUpperCase()}</h1> : null}
            </div>

            <WeatherIcon weatherType={data.main ? data.weather[0].main : null} />

          </div>


          {/* information container */}
          {data.name !== undefined &&

            <div name="temperature container" className="flex flex-row justify-center">

              {/* temp container */}
              <div name="temperature" className="min-w-[128px] tracking-widest pr-4 text-neutral-900 dark:text-neutral-200">
                {data.main ? <h1 className="text-8xl leading-[0.95em] font-thin">{data.main.temp.toFixed()}°</h1> : null}
                <div className="flex flex-row justify-between">

                  <div className="flex flex-row items-center text-neutral-700 dark:text-neutral-200">
                    <img src={Arrow} className="w-[16px] h-[16px] rotate-180" alt="arrow" />
                    <p className="px-1">
                      {data.main ? <p>{data.main.temp_min.toFixed()}°</p> : null}
                    </p>
                  </div>

                  <div className="flex flex-row items-center pr-7 text-neutral-700 dark:text-neutral-200">
                    <img src={Arrow} className="w-[16px] h-[16px]" alt="arrow" />
                    <p className="px-1">
                      {data.main ? <p>{data.main.temp_max.toFixed()}°</p> : null}
                    </p>
                  </div>

                </div>
              </div>

              {/* Details container */}
              <div className="flex flex-col divide-y w-[156px] divide-neutral-500 dark:divide-neutral-400" >
                <p className="text-lg tracking-[0.2em] pb-[2px]">DETAILS</p>

                <div className="grid grid-rows-4 pt-[2px] gap-1 tracking-[0.2em] text-xs font-medium">
                  <div className="flex flex-row justify-between items-center">
                    <p>FEELS LIKE</p>
                    {data.main ? <p className="">{data.main.feels_like.toFixed()}°C</p> : null}
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <p>HUMIDITY</p>
                    {data.main ? <p className="">{data.main.humidity}%</p> : null}
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <p>WIND</p>
                    {data.main ? <p className="">{data.wind.speed.toFixed(1)} m/s</p> : null}
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <p>PRESSURE</p>
                    {data.main ? <p className="">{data.main.pressure.toFixed()} mb</p> : null}
                  </div>
                </div>

              </div>
            </div>
          }

          <div className="items-center flex flex-col divide-y max-w-[700px] divide-neutral-500 dark:divide-neutral-400">
            <h1 className="pt-10 text-2xl tracking-[0.5em]"></h1>
            <h1 className="py-7 text-2xl tracking-[0.5em]">{dayNames[day].toUpperCase()}</h1>
            <h1 className="py-7 text-2xl tracking-[0.5em]">{formattedTime}</h1>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
