import React from 'react'
import { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa'
import { Country, State, City } from 'country-state-city';
import Select from 'react-select'
import axios from 'axios';

const Navbar = ({ onCountryChange, onTimezoneChange }) => {

  const [nav, setNav] = useState(false)
  const handleClick = () => { setNav(!nav) }
  const [timezoneData, setTimezoneData] = useState([])

  // Get country list
  let countryData = Country.getAllCountries()

  // set country list in array
  const countries = countryData.map((country) => ({
    value: country.name,
    label: country.name,
  }))

  // passes country value when changed
  const handleSelectChange = (SelectedOption) => {
    onCountryChange(SelectedOption)
    // handleClick()
  }

  // get timezone list
  useEffect(() => {
    const url = 'http://worldtimeapi.org/api/timezone'
    axios.get(url)
      .then((response) => { setTimezoneData(response.data) })
  }, [])

  // set timezone list in array
  const timeZones = timezoneData.map((data) => ({
    value: data,
    label: data,
  }))

  // passes timezone value if changed
  const handleTimezoneChange = (selectTimezone) => {
    onTimezoneChange(selectTimezone)
  }

  return (
    // search
    <div className="">
      <div className={!nav ? 'z-10 top-0 left-0 bg-stone-50/0' : 'p-5 z-10 fixed top-0 left-0 w-full bg-stone-50'}>
        {/* search container */}
        <div className={!nav ? 'hidden' : 'z-10 absolute top-0 left-0 w-full h-screen flex flex-col items-center bg-stone-50 dark:bg-slate-800'}>
          <div name="search" className="text-center p-4 items-center flex justify-center fixed px-6 w-full">

            <div className='pr-4'>
              <FaSearch className="size-4" />
            </div>

            <div className='w-full flex flex-row'>
              <div className='w-full text-left pr-2'>
                <Select className='dark:text-neutral-900'
                  placeholder="Select Country..."
                  options={countries}
                  onChange={handleSelectChange}
                />
              </div>
              <div className='w-full text-left pl-2'>
                <Select className='dark:text-neutral-900'
                  placeholder="Select Timezone..."
                  options={timeZones}
                  onChange={handleTimezoneChange}
                />
              </div>
            </div>

            {/* empty div */}
            <div className='w-56'>
            </div>

          </div>
        </div>

        {/* icon container */}
        <div className='flex justify-end py-1'>
          <div className='z-10' onClick={handleClick}>
            {!nav ? <FaPlus className='size-6' /> : (<div className='flex flex-row items-center'><FaTimes className="mx-5 size-4" /> <h1 className="tracking-[0.2em] font-medium">CONFIRM</h1></div>)}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar