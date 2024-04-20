import React from 'react'
import { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa'
import { Country, State, City } from 'country-state-city';
import Select from 'react-select'
import axios from 'axios';

<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

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
      <div className={!nav ? 'z-10 top-0 left-0 bg-stone-50/0' : 'p-5 z-10 fixed top-0 left-0 w-full bg-stone-50 dark:bg-slate-800'}>
        {/* search container */}
        <div className={!nav ? 'hidden' : 'z-10 absolute top-0 left-0 w-full h-screen flex flex-col items-center bg-stone-50 dark:bg-slate-800'}>
          <div name="search" className="text-center p-4 items-center flex justify-center fixed px-6 w-full">
            <div className={!nav ? 'hidden' : 'w-full flex flex-col'}>

              <div className='w-full text-left py-4'>
                <Select className='dark:text-neutral-900'
                  placeholder="Select Country..."
                  options={countries}
                  onChange={handleSelectChange}
                />
              </div>
              <div className='w-full text-left py-4'>
                <Select className='dark:text-neutral-900'
                  placeholder="Select Timezone..."
                  options={timeZones}
                  onChange={handleTimezoneChange}
                />
              </div>

              <div className='mt-5 py-4 border-2 rounded-md hover:cursor-pointer hover:bg-slate-800 hover:text-stone-50 dark:border-slate-50 dark:hover:bg-slate-50 dark:hover:text-neutral-900 duration-300' onClick={handleClick}>
                <div className='flex flex-row items-center justify-center' >
                  <h1 className="tracking-[0.2em] font-medium">CONFIRM</h1>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* icon container */}
        <div className='flex justify-end py-1 z-10 hover:cursor-pointer' onClick={handleClick}>
          {!nav ? <FaPlus className='size-6' /> : <FaPlus className='hidden' />}
        </div>

      </div>
    </div>
  )
}

export default Navbar