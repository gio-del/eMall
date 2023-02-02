import { useEffect, useRef } from 'react'
import ConnectorTypeDropdown from '../../utilitycomponent/ConnectorTypeDropdown'
import { useMap } from 'react-leaflet'
import { useState } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import L from 'leaflet'

export default function SearchBar({
  setChosenDate,
  connectors,
  setConnectors,
  onLocationChange,
}) {
  const provider = new OpenStreetMapProvider()
  const [searchResults, setSearchResults] = useState([])

  const debounce = (func, wait) => {
    let timeout

    return (...args) => {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const handleSearch = async (event) => {
    const searchValue = event.target.value
    if (!searchValue) {
      setSearchResults([])
      return
    }
    const results = await provider.search({ query: searchValue })
    const limitedResults = results.slice(0, 3)
    setSearchResults(limitedResults)
  }
  const debouncedHandleSearch = debounce(handleSearch, 500)

  const map = useMap()

  const handleMapCentering = async (event) => {
    const newLocation = {
      latitude: searchResults[event.target.id].y,
      longitude: searchResults[event.target.id].x,
    }
    map.flyTo([newLocation.latitude, newLocation.longitude], 12, {
      duration: 0.5,
    })
    setSearchResults([])
    onLocationChange(newLocation)
  }

  function handleChange() {
    const date = document.getElementById('date')
    setChosenDate(date.value)
  }

  return (
    <div className="flex flex-col justify-start mx-2 border-2 border-searchInput drop-shadow-2xl bg-tertiary dark:bg-dk-secondary rounded-2xl mb-4 shadow-lg p-4 cursor-default">
      <div className="flex items-center justify-center mb-3">
        <input
          type="text"
          placeholder="Search"
          onChange={debouncedHandleSearch}
          className="w-full rounded-xl dark:bg-searchInput text-[15px] placeholder-gray-500 dark:placeholder-dk-secondary placeholder:font-semibold p-3 focus:outline-0"
        />
        <svg
          className="absolute right-7 dark:fill-dk-secondary fill-searchInput mr-1"
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="30"
          viewBox="0 0 60 40"
        >
          <path d="m26.35 42-5.7-14.65L6 21.65V19.5L42 6 28.5 42Zm.9-5.7 9.6-25.15-25.1 9.6 11.2 4.3Zm-4.3-11.25Z" />
        </svg>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="inline-flex">
          <svg
            className="fill-searchInput mx-2 max-md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 60 35"
          >
            <path d="M21.35 42V30.75h3v4.15H42v3H24.35V42ZM6 37.9v-3h12.35v3Zm9.35-8.3v-4.1H6v-3h9.35v-4.2h3v11.3Zm6-4.1v-3H42v3Zm8.3-8.25V6h3v4.1H42v3h-9.35v4.15ZM6 13.1v-3h20.65v3Z" />
          </svg>
          <div
            className="flex items-center justify-center"
            onClick={() => handleDataClick()}
          >
            <span
              id="placeholder"
              className="absolute font-semibold text-[14.5px] text-tertiary dark:text-dk-secondary"
            >
              Select date
            </span>
            <input
              type="date"
              id="date"
              onChange={() => {
                handleChange()
                handleRestore()
              }}
              className="text-center h-full dark:bg-tertiary bg-dk-primary rounded-xl font-semibold text-[14.5px] text-dk-primary dark:text-tertiary"
            ></input>
          </div>

          <ConnectorTypeDropdown
            connectors={connectors}
            setConnectors={setConnectors}
          />
        </div>
      </div>

      <div id="results" className="mt-4">
        {searchResults.map((result) => (
          <div
            className="border-2 border-tertiary p-2 rounded-xl m-2 cursor-pointer hover:bg-white dark:hover:bg-dk-nav"
            onClick={handleMapCentering}
          >
            <p
              className="dark:text-tertiary"
              id={searchResults.indexOf(result)}
              key={searchResults.indexOf(result)}
            >
              {result.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function handleRestore() {
  const date = document.querySelector('#date')
  const placeholder = document.querySelector('#placeholder')
  if (date.value === '') {
    placeholder.classList.remove('hidden')

    date.classList.add('dark:text-tertiary')
    date.classList.remove('dark:text-dk-secondary')
    date.classList.add('text-dk-primary')
    date.classList.remove('text-tertiary')
  }
}

function handleDataClick() {
  const date = document.querySelector('#date')
  const placeholder = document.querySelector('#placeholder')

  placeholder.classList.add('hidden')

  date.classList.remove('dark:text-tertiary')
  date.classList.add('dark:text-dk-secondary')
  date.classList.remove('text-dk-primary')
  date.classList.add('text-tertiary')
  date.click()
}
