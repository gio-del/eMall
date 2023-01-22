import RadioComponent from './RadioComponent'
import ConnectorSVG from './../../utilitycomponent/ConnectorSVG'
import { useState, useEffect } from 'react'
import './BookSection.css'
import Calendar from './Calendar'
import { BASE_API } from '../../../constant'

export default function BookSection({ connectors, id }) {
  const [typeName, setTypeName] = useState(connectors[0].typeName)
  const [power, setPower] = useState(connectors[0].power)
  const [selectedDate, setSelectedDate] = useState()
  const [slots, setSlots] = useState()
  const [currentTimeStart, setCurrentTimeStart] = useState()
  const [maxDuration, setMaxDuration] = useState()
  const [currentTimeEnd, setCurrentTimeEnd] = useState()

  const connectorIds = connectors.map(
    (connector) => connector.typeName + connector.power,
  )

  const createDate = (data) => {
    const split = data.split(':', 3)
    const date = new Date()
    date.setHours(split[0])
    date.setMinutes(split[1])
    date.setSeconds(split[2])
    return date
  }

  const calculateFrom = (data) => {
    const from = new Date(data.from)
    const to = new Date(data.to)
    let last = new Date(from.getTime())
    const result = []
    for (let i = 0; last.getTime() + 1000 * 60 * 30 < to.getTime(); i++) {
      last = new Date(from.getTime() + 1000 * 60 * 30 * i)
      result.push(last)
    }
    return result
  }

  const getMaxDuration = async () => {
    if (!currentTimeStart) return
    try {
      const timeFrom = new Date()
      timeFrom.setHours(currentTimeStart.split(':', 2)[0])
      timeFrom.setMinutes(currentTimeStart.split(':', 2)[1])
      const response = await fetch(
        `${BASE_API}/driver/reserve/duration/${id}?type=${typeName}&power=${power}&timeFrom=${timeFrom.toUTCString()}`,
        { credentials: 'include' },
      )
      const maxDuration = await response.json()
      setMaxDuration(maxDuration)
      console.log(maxDuration)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMaxDuration()
  }, [currentTimeStart])

  useEffect(() => {
    connectorIds.forEach((id) => {
      document.getElementById(`connector-${id}`)?.classList.remove('checked')
    })
    document
      .getElementById(`connector-${typeName + power}`)
      ?.classList.add('checked')
  }, [typeName, power])

  const getSlots = async () => {
    if (!selectedDate) return
    try {
      const response = await fetch(
        `${BASE_API}/driver/reserve/slot/${id}?type=${typeName}&power=${power}&date=${selectedDate}`,
        { credentials: 'include' },
      )
      const jsonData = await response.json()
      setSlots(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getSlots()
  }, [selectedDate])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <div className="px-3 pb-3">
        <div className="flex flex-row justify-around mt-7">
          {connectors.map((connector) => (
            <div key={connector.socketID}>
              <RadioComponent
                id={`connector-${connector.typeName + connector.power}`}
                onChange={() => {
                  setTypeName(connector.typeName)
                  setPower(connector.power)
                }}
              >
                <label
                  htmlFor={`connector-${connector.typeName + connector.power}`}
                  className="flex flex-row justify-start items-center pr-10 rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
                >
                  <ConnectorSVG type={connector.typeName} />
                  <div className="border-l-2 dark:border-tertiary border-dk-secondary flex  h-full p-3">
                    <div>
                      <p className="font-semibold">{connector.typeName}</p>
                      <p className="font-light text-sm">{connector.power}KW</p>
                    </div>
                  </div>
                </label>
              </RadioComponent>
            </div>
          ))}
        </div>
        <Calendar onDateChange={handleDateChange} />
        <div className="mt-4">
          <p className="text-dk-secondary dark:text-tertiary">
            Start the charge at
          </p>
          <div className="grid grid-cols-5 gap-4 mt-1">
            {slots &&
              slots.map((data) =>
                calculateFrom(data).map((slot) => (
                  <RadioComponent
                    key={`${slot.getHours()}:${slot.getMinutes()}`}
                    id={`${slot.getHours()}:${slot.getMinutes()}`}
                    onChange={(e) => setCurrentTimeStart(e.target.id)}
                  >
                    <label
                      htmlFor={`${slot.getHours()}:${slot.getMinutes()}`}
                      className="flex justify-center py-2 px-1 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
                    >
                      <p className="font-semibold">{`${slot.getHours()}:${slot.getMinutes()}`}</p>
                    </label>
                  </RadioComponent>
                )),
              )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-dk-secondary dark:text-tertiary">
            End the charge at
          </p>
          <div className="grid grid-cols-5 gap-4"></div>
          <button className="mt-8 w-full bg-dk-primary rounded-full h-14">
            Book
          </button>
        </div>
      </div>
    </>
  )
}
