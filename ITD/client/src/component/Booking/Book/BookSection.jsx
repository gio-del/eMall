import { useState, useEffect } from 'react'
import './BookSection.css'
import Calendar from './Calendar'
import { BASE_API } from '../../../constant'
import ScrollableSelection from './ScrollableSelection'
import SlotsSelection from './SlotsSelection'
import ConnectorsSelection from './ConnectorsSelection'
import DurationSlider from './DurationSlider'
import { useNavigate } from 'react-router-dom'

export default function BookSection({ connectors, id }) {
  const [typeName, setTypeName] = useState(connectors[0].typeName)
  const [power, setPower] = useState(connectors[0].power)
  const [selectedDate, setSelectedDate] = useState()
  const [slots, setSlots] = useState()
  const [currentTimeStart, setCurrentTimeStart] = useState()
  const [maxDuration, setMaxDuration] = useState()
  const [currentDuration, setCurrentDuration] = useState()

  const navigate = useNavigate()

  const connectorIds = connectors.map(
    (connector) => connector.typeName + connector.power,
  )

  const slotIds = (slotArray) => {
    return slotArray.map((data) => {
      return calculateFrom(data).map((slot) => {
        return `${slot.getHours()}:${slot.getMinutes()}`
      })
    })[0]
  }

  const calculateFrom = (data) => {
    const from = new Date(data.from)
    const to = new Date(data.to)
    const midnight = new Date(from)
    midnight.setHours(24)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    let last = new Date(from.getTime())
    const result = []
    for (
      let i = 0;
      last.getTime() + 1000 * 60 * 30 < to.getTime() &&
      last.getTime() + 1000 * 60 * 30 < midnight;
      i++
    ) {
      last = new Date(from.getTime() + 1000 * 60 * 30 * i)
      result.push(last)
    }
    return result
  }
  const dateFrom = () => {
    const timeFrom = new Date(selectedDate)
    timeFrom.setHours(currentTimeStart.split(':', 2)[0])
    timeFrom.setMinutes(currentTimeStart.split(':', 2)[1])

    return timeFrom
  }
  const book = async () => {
    if (!currentTimeStart && !currentDuration) return
    try {
      const from = dateFrom()
      const to = new Date(from)
      to.setTime(to.getTime() + currentDuration * 60 * 60 * 1000)
      const response = await fetch(`${BASE_API}/driver/reserve/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          type: typeName,
          power: power,
          timeFrom: from.toUTCString(),
          timeTo: to.toUTCString(),
        }),
      })

      if (response.status === 200) {
        navigate('./reservation')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getMaxDuration = async () => {
    if (!currentTimeStart) return
    try {
      const response = await fetch(
        `${BASE_API}/driver/reserve/duration/${id}?type=${typeName}&power=${power}&timeFrom=${dateFrom().toUTCString()}`,
        { credentials: 'include' },
      )

      if (response.status === 200) {
        const maxDuration = await response.json()
        console.log(maxDuration)
        setMaxDuration(maxDuration)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMaxDuration()
  }, [currentTimeStart])

  useEffect(() => {
    if (slots) {
      slotIds(slots).forEach((id) => {
        document.getElementById(id)?.classList.remove('checked')
      })
      document.getElementById(currentTimeStart)?.classList.add('checked')
    }
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
      if (response.status === 200) {
        const jsonData = await response.json()
        jsonData.map
        setSlots(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getSlots()
    setCurrentTimeStart()
  }, [selectedDate, typeName, power])

  return (
    <>
      <div className="px-3 pb-3">
        <ConnectorsSelection
          connectors={connectors}
          setPower={setPower}
          setTypeName={setTypeName}
        />
        <ScrollableSelection>
          <Calendar onDateChange={(date) => setSelectedDate(date)} />
        </ScrollableSelection>
        {selectedDate && (
          <>
            <div className="mt-4">
              <p className="text-dk-secondary dark:text-tertiary">
                Start the charge at
              </p>
              <ScrollableSelection>
                <SlotsSelection
                  slots={slots}
                  setCurrentTimeStart={setCurrentTimeStart}
                  calculateFrom={calculateFrom}
                />
              </ScrollableSelection>
            </div>
            {maxDuration && currentTimeStart && (
              <div className="mt-4">
                <p className="text-dk-secondary dark:text-tertiary">
                  Charge Duration
                </p>
                <div className="px-2">
                  <DurationSlider
                    maxDuration={maxDuration}
                    currentTimeStart={currentTimeStart}
                    setCurrentDuration={setCurrentDuration}
                  />
                </div>
                {currentDuration && (
                  <button
                    className="mt-8 w-full bg-dk-primary rounded-full h-14"
                    onClick={book}
                  >
                    Book
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
