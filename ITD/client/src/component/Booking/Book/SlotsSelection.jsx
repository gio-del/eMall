import { useEffect } from 'react'
import { useState } from 'react'
import RadioComponent from './RadioComponent'

export default function SlotsSelection({
  slots,
  setCurrentTimeStart,
  calculateFrom,
}) {
  const [fromArray, setFromArray] = useState()

  useEffect(() => {
    if (slots) {
      setFromArray(slots.map((data) => calculateFrom(data)).flat(1))
    }
  }, [slots])
  return (
    <>
      {fromArray &&
        fromArray.length > 0 &&
        fromArray.map((slot, idx) => (
          <div key={`${idx}`} className="px-2">
            <RadioComponent
              id={`${slot.getHours()}:${slot.getMinutes()}`}
              onChange={(e) => setCurrentTimeStart(e.target.id)}
            >
              <label
                htmlFor={`${slot.getHours()}:${slot.getMinutes()}`}
                className="flex justify-center py-2 px-2 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
              >
                <p className="font-semibold">{`${slot
                  .getHours()
                  .toLocaleString('en-us', {
                    minimumIntegerDigits: 2,
                  })}:${slot
                  .getMinutes()
                  .toLocaleString('en-us', { minimumIntegerDigits: 2 })}`}</p>
              </label>
            </RadioComponent>
          </div>
        ))}
      {fromArray && fromArray.length === 0 && <p>Select another date</p>}
    </>
  )
}
