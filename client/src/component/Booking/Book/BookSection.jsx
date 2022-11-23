import RadioComponent from './RadioComponent'
import CCS2 from './../../../assets/socketTypeCCS2.svg'
import CCS2dark from './../../../assets/socketTypeCCS2dark.svg'
import { useState, useRef, useEffect } from 'react'
import './BookSection.css'

export default function BookSection({ connectors }) {
  const [selectedConnector, setSelectedConnector] = useState()
  const [currentTimeStart, setCurrentTimeStart] = useState()
  const [currentTimeEnd, setCurrentTimeEnd] = useState()
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const connectorTypes = connectors.map((connector) => connector.type)

  useEffect(() => {
    connectorTypes.forEach((type) => {
      document
        .getElementById(`connectorType-${type}`)
        ?.classList.remove('checked')
    })
    document
      .getElementById(`connectorType-${selectedConnector}`)
      ?.classList.add('checked')
  }, [selectedConnector])

  return (
    <>
      <div class="flex flex-row justify-around mt-7">
        {connectors.map((connector) => (
          <div key={connector.type}>
            <RadioComponent
              id={`connectorType-${connector.type}`}
              onChange={() => setSelectedConnector(connector.type)}
            >
              <label
                for={`connectorType-${connector.type}`}
                className="flex flex-row justify-start items-center pr-10 rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
              >
                <div className="flex items-center justify-center">
                  <img src={CCS2} className="p-1 h-12 dark:hidden"></img>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={CCS2dark}
                    className="p-1 h-12 hidden dark:inline"
                  ></img>
                </div>
                <div className="border-l-2 dark:border-tertiary border-dk-secondary flex  h-full p-3">
                  <div>
                    <p className="font-semibold">{connector.type}</p>
                    <p className="font-light text-sm">{connector.power}</p>
                  </div>
                </div>
              </label>
            </RadioComponent>
          </div>
        ))}
      </div>
      <div className="p-10 bg-red-500">Here goes the calendar</div>
      <div className="flex justify-between items-center pr-7">
        <label
          htmlFor="showOnlyAvailable"
          className="text-dk-secondary dark:text-tertiary"
        >
          Show only available slots
        </label>
        <label class="inline-flex relative items-center cursor-pointer">
          <input
            id="showOnlyAvailable"
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setOnlyAvailable((prev) => !prev)}
          />
          <div class="w-11 h-6 border-2 dark:border-tertiary border-dk-secondary bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dk-primary" />
        </label>
      </div>
      <div className="mt-4">
        <p className="text-dk-secondary dark:text-tertiary">
          Start the charge at
        </p>
        <div className="grid grid-cols-5 gap-4">
          <RadioComponent id="oneHour">
            <label
              for={`oneHour`}
              className="flex justify-center py-4 px-1 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
            >
              <p className="font-semibold">09:00</p>
            </label>
          </RadioComponent>
          <RadioComponent id="anotherHour">
            <label
              for={`anotherHour`}
              className="flex justify-center py-4 px-1 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
            >
              <p className="font-semibold">09:30</p>
            </label>
          </RadioComponent>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-dk-secondary dark:text-tertiary">
          End the charge at
        </p>
        <div className="grid grid-cols-5 gap-4">
          <RadioComponent id="oneHour">
            <label
              for={`oneHour`}
              className="flex justify-center py-4 px-1 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
            >
              <p className="font-semibold">09:00</p>
            </label>
          </RadioComponent>
          <RadioComponent id="anotherHour">
            <label
              for={`anotherHour`}
              className="flex justify-center py-4 px-1 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
            >
              <p className="font-semibold">09:30</p>
            </label>
          </RadioComponent>
        </div>
        <button className="mt-8 w-full bg-dk-primary rounded-full h-14">
          Book
        </button>
      </div>
    </>
  )
}
