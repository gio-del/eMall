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
        maxDuration.hours +
          maxDuration.minutes / 60 +
          maxDuration.seconds / 3600,
      )
    }
  }, [maxDuration])

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
    <div className="flex flex-row justify-between items-center mt-2">
      <input
        className="h-2 bg-dk-secondary dark:bg-dk-primary rounded-lg appearance-none cursor-pointer"
        type="range"
        min={0}
        max={maxTime.current}
        step={0.5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span>End: {endDate(value)}</span>
      <span>Duration: {getTime(value)}</span>
    </div>
  )
}
