import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function DurationSlider({
  maxDuration,
  setCurrentDuration,
  currentTimeStart,
}) {
  const [value, setValue] = useState(0)
  const maxTime = useRef()
  useEffect(() => {
    if (maxDuration.inf) {
      maxTime.current = 5
    } else {
      maxTime.current = Math.min(
        5,
        (maxDuration?.maxDuration?.days || 0) * 24 +
          (maxDuration?.maxDuration?.hours || 0) +
          (maxDuration?.maxDuration?.minutes || 0) / 60 +
          (maxDuration?.maxDuration?.seconds || 0) / 3600,
      )
    }
  }, [maxDuration])

  useEffect(() => {
    setValue(0)
  }, [currentTimeStart])

  useEffect(() => {
    setCurrentDuration(value)
  }, [value])

  const getTime = (value) => {
    const hours = Math.floor(value)
    const minutes = Math.floor((value - hours) * 60)
    return `${hours} hours ${minutes} minutes`
  }
  const endDate = (value) => {
    const time = new Date()
    time.setHours(currentTimeStart.split(':', 2)[0])
    time.setMinutes(currentTimeStart.split(':', 2)[1])
    time.setTime(time.getTime() + value * 60 * 60 * 1000)
    const options = { hour: 'numeric', minute: 'numeric' }

    return time.toLocaleTimeString('en-US', options)
  }
  return (
    <div>
      <div className="flex flex-row justify-evenly items-center mt-2">
        <div
          className="hover:bg-dk-primary px-4 py-2 rounded-xl cursor-pointer border-2 border-tertiary"
          onClick={(e) => setValue(value > 0 ? value - 0.5 : 0.0)}
        >
          <p className="text-tertiary font-semibold">-30min</p>
        </div>
        <div className=" dark:border-tertiary border-dk-secondary px-4 py-2 rounded-xl flex-col justify-center">
          <span className="dark:text-tertiary text-dk-secondary text-md font-semibold text-center">
            {' '}
            {`${endDate(value)}`}
          </span>
        </div>
        <div
          className="hover:bg-dk-primary px-4 py-2 rounded-xl cursor-pointer border-2 border-tertiary"
          onClick={(e) =>
            setValue(value < maxTime.current ? value + 0.5 : value)
          }
        >
          <p className="text-tertiary font-semibold">+30min</p>
        </div>
      </div>
      <div className=" dark:border-tertiary border-dk-secondary px-4 py-2 rounded-xl flex justify-center">
        <span className="dark:text-tertiary text-dk-secondary font-medium text-center">
          {' '}
          {`(${getTime(value)})`}
        </span>
      </div>
    </div>
  )
}
