import { useState, useEffect } from 'react'
import RadioComponent from './RadioComponent'

export default function Calendar({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState()
  const dates = []

  const selectableDates = () => {
    const startDate = new Date()
    const value = {
      id: `${startDate.toUTCString()}`,
      day: `${startDate.getDate()}`,
      name: `${startDate.toString().split(' ')[0]}`,
      month: `${startDate.toString().split(' ')[1]}`,
    }
    dates.push(value)

    for (let i = 0; i < 10; i++) {
      const currentDate = new Date(
        startDate.getTime() + (1 + i) * 24 * 60 * 60 * 1000,
      )
      currentDate.setHours(0)
      currentDate.setMinutes(0)
      currentDate.setSeconds(0)
      currentDate.setMilliseconds(0)
      const value = {
        id: `${currentDate.toUTCString()}`,
        day: `${currentDate.getDate()}`,
        name: `${currentDate.toString().split(' ')[0]}`,
        month: `${currentDate.toString().split(' ')[1]}`,
      }
      dates.push(value)
    }
    return dates
  }

  const handleChange = (newDate) => {
    setSelectedDate(newDate.day)
    onDateChange(newDate.id)
  }

  useEffect(() => {
    const datesIds = dates.map((uniqueDay) => uniqueDay.day)
    datesIds.forEach((day) => {
      document
        .getElementById(`date-${day}`)
        ?.classList.remove('checked', 'text-tertiary')
      document
        .getElementById(`date-label-${day}`)
        ?.classList.add('text-dk-secondary')
    })
    document
      .getElementById(`date-${selectedDate}`)
      ?.classList.add('checked', 'text-tertiary')
    document
      .getElementById(`date-label-${selectedDate}`)
      ?.classList.remove('text-dk-secondary')
  }, [selectedDate])

  return (
    <>
      {selectableDates().map((uniqueDay) => (
        <div key={uniqueDay.day} className="relative px-3 mb-2 w-full left-0">
          <div className="text-center">
            <p className="text-sm mb-2 text-dk-secondary dark:text-tertiary">
              {uniqueDay.name}
            </p>
            <RadioComponent
              id={`date-${uniqueDay.day}`}
              onChange={() => handleChange(uniqueDay)}
            />
            <label
              id={`date-label-${uniqueDay.day}`}
              className="flex aspect-square rounded-full w-12 h-12 font-semibold cursor-pointer dark:text-tertiary text-dk-secondary items-center"
              htmlFor={`date-${uniqueDay.day}`}
            >
              <span className="text-inherit w-full text-center text-xl">
                {uniqueDay.day}
              </span>
            </label>
            <p className="font-regular mt-2 text-sm text-dk-secondary dark:text-tertiary">
              {uniqueDay.month}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
