import React from 'react'
import { useState, useEffect } from 'react'

const CityTime = ({ city }) => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => { setTime(new Date()) }, 1000);
    return () => {
      clearInterval(timer);
    };

  }, []);

  const formattedTime = time.toLocaleTimeString("en-US",
    {
      timeZone: city.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })

  return (
    <div name="city-zone">
      <p>{formattedTime}</p>
    </div>
  )
}

export default CityTime