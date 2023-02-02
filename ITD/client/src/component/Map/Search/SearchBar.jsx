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
  const debouncedHandleSearch = debounce(handleSearch, 300)

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
    <div className="flex flex-col justify-start mx-2 drop-shadow-2xl bg-tertiary dark:bg-dk-secondary rounded-2xl mb-4 shadow-sm p-4 cursor-default">
      <div className="flex items-center justify-center">
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
      

      <div id="results" className="">
        {searchResults.map((result) => (
          <div
            className="border-2 border-tertiary p-2 rounded-xl mt-3 cursor-pointer hover:bg-white dark:hover:bg-dk-nav"
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
