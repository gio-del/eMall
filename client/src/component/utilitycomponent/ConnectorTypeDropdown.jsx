import { useEffect } from 'react'
import { useState } from 'react'
import CCS2 from './../../assets/socketTypeCCS2.svg'

export default function ConnectorTypeDropdown({ connectors, setConnectors }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dropdown = document.getElementById('dropdown')
    dropdown.classList.toggle('hidden')
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
      <div className="absolute right-[2px] flex justify-center items-center w-full mt-16">
        <div
          className="relative  w-10/12 inline-flex justify-evenly z-10 p-1 px-4 bg-tertiary dark:bg-dk-secondary rounded-2xl shadow-lg border-2 border-searchInput hidden"
          id="dropdown"
          role="menu"
          aria-labelledby="menu-button"
        >
          <div className="mx-2 my-4 w-1/3">
            <input
              onChange={(e) => handleSelection(e)}
              type="checkbox"
              id="CCS"
              name="productOptions"
              value="2"
              className="sr-only peer"
            />
            <label
              className="flex p-5
              dark:bg-dk-secondary dark:peer-checked:bg-tertiary dark:text-white dark:peer-checked:text-dk-secondary dark:border dark:border-tertiary
              bg-tertiary peer-checked:bg-dk-primary text-dk-secondary peer-checked:text-tertiary border border-dk-secondary peer-checked:border-0
              font-semibold rounded-2xl cursor-pointer focus:outline-none"
              for="CCS"
            >
              <span className="text-inherit w-full text-center">CCS</span>
            </label>
          </div>
          <div className="mx-2 my-4 w-1/3">
            <input
              onChange={(e) => handleSelection(e)}
              type="checkbox"
              id="Type2"
              name="productOptions"
              value="2"
              className="sr-only peer"
            />
            <label
              className="flex p-5 
              dark:bg-dk-secondary dark:peer-checked:bg-tertiary dark:text-white dark:peer-checked:text-dk-secondary dark:border dark:border-tertiary
              bg-tertiary peer-checked:bg-dk-primary text-dk-secondary peer-checked:text-tertiary border border-dk-secondary peer-checked:border-0
              font-semibold rounded-2xl cursor-pointer focus:outline-none"
              for="Type2"
            >
              <span className="text-inherit w-full text-center">Type2</span>
            </label>
          </div>
          <div className="mx-2 my-4 w-1/3">
            <input
              onChange={(e) => handleSelection(e)}
              type="checkbox"
              id="Tesla"
              name="productOptions"
              value="2"
              className="sr-only peer"
            />
            <label
              className="flex p-5 
              dark:bg-dk-secondary dark:peer-checked:bg-tertiary dark:text-white dark:peer-checked:text-dk-secondary dark:border dark:border-tertiary
              bg-tertiary peer-checked:bg-dk-primary text-dk-secondary peer-checked:text-tertiary border border-dk-secondary peer-checked:border-0
              font-semibold rounded-2xl cursor-pointer focus:outline-none"
              for="Tesla"
            >
              <span className="text-inherit w-full text-center">Tesla</span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
