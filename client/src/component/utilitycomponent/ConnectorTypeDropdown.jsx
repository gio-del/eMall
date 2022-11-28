import { useEffect } from 'react'
import { useState } from 'react'
import CheckBox from './CheckBox'

export default function ConnectorTypeDropdown({ connectors, setConnectors }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dropdown = document.getElementById('dropdown')

    if (isOpen) dropdown.classList.remove('hidden')
    else dropdown.classList.add('hidden')
    connectors.forEach(
      (connector) => (document.getElementById(connector).checked = true),
    )
  }, [isOpen])

  useEffect(() => {
    if (connectors.length === 0) {
      document.getElementById('buttonPlaceholder').classList.remove('hidden')
    } else {
      document.getElementById('buttonPlaceholder').classList.add('hidden')
    }
  }, [connectors])

  function handleSelection(e) {
    if (e.target.checked && !connectors.includes(e.target.id)) {
      setConnectors((prev) => [...prev, e.target.id])
    } else {
      setConnectors((prev) => prev.filter((item) => item !== e.target.id))
    }
  }

  return (
    <>
      <div class="inline-block text-left ml-3 ">
        <div>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className="inline-flex w-full justify-center rounded-xl px-4 py-2 font-semibold shadow-sm focus:outline-none text-[14.5px]
            bg-dk-primary text-tertiary
            dark:bg-tertiary dark:text-dk-secondary"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {' '}
            <span id="buttonPlaceholder" className="text-inherit">
              Select connector
            </span>
            {connectors.join(', ')}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute right-[-1px] flex justify-center items-center w-full mt-16">
        <div
          className="relative grid grid-cols-3  w-10/12 gap-3 p-5 z-10 px-4 bg-tertiary dark:bg-dk-secondary rounded-2xl shadow-lg border-2 border-searchInput hidden"
          id="dropdown"
          role="menu"
          aria-labelledby="menu-button"
        >
          <CheckBox id="CCS" label="CCS" onChange={(e) => handleSelection(e)} />
          <CheckBox
            id="Type2"
            label="Type2"
            onChange={(e) => handleSelection(e)}
          />
          <CheckBox
            id="Tesla"
            label="Tesla"
            onChange={(e) => handleSelection(e)}
          />
          <CheckBox
            id="CHAdeMO"
            label="CHAdeMO"
            onChange={(e) => handleSelection(e)}
          />
        </div>
      </div>
    </>
  )
}
