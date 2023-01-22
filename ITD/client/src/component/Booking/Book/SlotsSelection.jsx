import RadioComponent from './RadioComponent'

export default function SlotsSelection({
  slots,
  setCurrentTimeStart,
  calculateFrom,
}) {
  return (
    <>
      {slots &&
        slots.map((data) =>
          calculateFrom(data).map((slot) => (
            <div
              key={`${slot.getHours()}:${slot.getMinutes()}`}
              className="px-2"
            >
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
          )),
        )}
    </>
  )
}
