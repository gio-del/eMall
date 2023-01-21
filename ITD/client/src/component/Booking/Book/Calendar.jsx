import { useState, useEffect, useRef } from 'react'
import { RadioDate } from './RadioDate'
import './Calendar.css'

export default function Calendar({onDateChange}) {
  const [selectedDate, setSelectedDate] = useState()
  const scrollTimerRef = useRef()
  const scrollVelocity = 150
  const dates = []
  
  const onWheel = (e) => {
    const container = scrollRef.current
    const containerScrollPosition = scrollRef.current.scrollLeft

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    })
  }

  const scrollRef = useRef(null)

  const selectableDates = () => {
    const startDate = new Date()
    const value = {
      id: `${startDate.toISOString()}`,
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
        id: `${currentDate.toISOString()}`,
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

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset
  }

  useEffect(() => {
    const datesIds = dates.map((uniqueDay) => uniqueDay.day)
    datesIds.forEach((day) => {
      document.getElementById(`date-${day}`)?.classList.remove('checked', 'text-tertiary')
      document.getElementById(`date-label-${day}`)?.classList.add('text-dk-secondary')
    })
    document.getElementById(`date-${selectedDate}`)?.classList.add('checked', 'text-tertiary')
    document.getElementById(`date-label-${selectedDate}`)?.classList.remove('text-dk-secondary')
    
  }, [selectedDate])

  

  return (
    <>
      <div className="flex-row w-full">
        <div className="flex">
          <button
            className="bg-red max-sm:hidden"
            onClick={() => scroll(-60)}
            onMouseDown={() => {
              scrollTimerRef.current = window.setInterval(
                () => scroll(-60),
                scrollVelocity,
              )
            }}
            onMouseUp={() => clearInterval(scrollTimerRef.current)}
          >
            <div className="border-2 dark:border-tertiary border-dk-secondary py-2 mr-1 rounded-lg shadow-md mb-4 hover:bg-dk-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                className="fill-dk-secondary dark:fill-tertiary hover:fill-tertiary"
                viewBox="3 5 40 40"
              >
                <path d="M28.1 36.45 15.55 23.9 28.1 11.35l2.6 2.6-9.95 9.95 9.95 9.95Z" />
              </svg>
            </div>
          </button>

          <div
            className="container-scroll overflow-x-scroll overflow-y-hidden flex my-6 mr-2"
            id="container"
            ref={scrollRef}
            onWheel={onWheel}
          >
            {selectableDates().map((uniqueDay) => (
              <div
                key={uniqueDay.day}
                className="relative px-3 mb-2 w-full left-0"
              >
                <div className="text-center">
                  <p className="text-sm mb-2 text-dk-secondary dark:text-tertiary">
                    {uniqueDay.name}
                  </p>
                  <RadioDate
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
          </div>

          <button
            className="bg-red max-sm:hidden"
            onClick={() => scroll(60)}
            onMouseDown={() => {
              scrollTimerRef.current = window.setInterval(
                () => scroll(60),
                scrollVelocity,
              )
            }}
            onMouseUp={() => clearInterval(scrollTimerRef.current)}
          >
            <div className="border-2 dark:border-tertiary border-dk-secondary py-2 mr-1 rounded-lg shadow-md mb-4 hover:bg-dk-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                className="fill-dk-secondary dark:fill-tertiary hover:fill-tertiary"
                viewBox="0 5 40 40"
              >
                <path d="m18.75 36.45-2.6-2.6 9.95-9.95-9.95-9.95 2.6-2.6L31.3 23.9Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
