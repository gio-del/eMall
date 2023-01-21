import RadioComponent from './RadioComponent'
import ConnectorSVG from './../../utilitycomponent/ConnectorSVG'
import { useState, useEffect } from 'react'
import './BookSection.css'
import Calendar from './Calendar'


const mockupData = [{
  from: '09:30:00',
  to: '10:00:00'
}, {
  from: '11:30:00',
  to: '13:00:00'
}, {
  from: '14:30:00',
  to: '18:00:00'
},{
  from: '19:30:00',
  to: '21:00:00'
}]

export default function BookSection({ connectors, id }) {
  const [typeName, setTypeName] = useState(connectors[0].typeName)
  const [power, setPower] = useState(connectors[0].power)
  const [selectedDate, setSelectedDate] = useState()
  const [currentTimeStart, setCurrentTimeStart] = useState()
  const [currentTimeEnd, setCurrentTimeEnd] = useState()

  const connectorIds = connectors.map(
    (connector) => connector.typeName + connector.power,
  )

  useEffect(() => {
    connectorIds.forEach((id) => {
      document.getElementById(`connector-${id}`)?.classList.remove('checked')
    })
    document
      .getElementById(`connector-${typeName + power}`)
      ?.classList.add('checked')
  }, [typeName, power])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <div className='px-3 pb-3'>
        <div class="flex flex-row justify-around mt-7">
          {connectors.map((connector) => (
            <div key={connector.socketID}>
              <RadioComponent
                id={`connector-${connector.typeName + connector.power}`}
                onChange={() => {
                  setTypeName(connector.typeName);
                  setPower(connector.power);
                }}
              >
                <label
                  for={`connector-${connector.typeName + connector.power}`}
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
        <Calendar onDateChange={handleDateChange}/>
        <div className="mt-4">
          <p className="text-dk-secondary dark:text-tertiary">
            Start the charge at
          </p>
          <div className="grid grid-cols-5 gap-4">
            {mockupData.forEach((slot) => {
              <RadioComponent id="anotherHour">
              <label
                for={`anotherHour`}
                className="flex justify-center py-4 px-1 items-center rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
              >
                <p className="font-semibold">{slot.from}</p>
              </label>
            </RadioComponent>
            })}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-dk-secondary dark:text-tertiary">
            End the charge at
          </p>
          <div className="grid grid-cols-5 gap-4">
          </div>
          <button className="mt-8 w-full bg-dk-primary rounded-full h-14">
            Book
          </button>
        </div>
      </div>
    </>
  );
}
