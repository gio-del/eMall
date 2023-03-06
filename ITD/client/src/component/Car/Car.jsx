import { useEffect, useState } from 'react'
import carImage from '../../assets/Car.png'
import chademo from '../../assets/CHAdeMo.png'
import useWindowDimensions from './useWindowDimensions'
import { BASE_API } from '../../constant'
import RadioButton from '../utilitycomponent/RadioButton'

export default function Car() {
  const { height, width } = useWindowDimensions()
  const [startedReservations, setStartedReservations] = useState()
  const [reservationInput, setReservationInput] = useState()
  const [reservation, setReservation] = useState()
  const [meterValues, setMeterValues] = useState()
  const [stopWatch, setStopWatch] = useState()
  const [batteryStart, setBatteryStart] = useState()
  const [capacity, setCapacity] = useState()
  const [form, setForm] = useState()
  const [result, setResult] = useState()

  const getStartedReservations = async () => {
    try {
      const response = await fetch(`${BASE_API}/driver/reserve/`, {
        credentials: 'include',
      })
      if (response.status === 200) {
        const newStartedReservations = []

        const jsonData = await response.json()

        const now = new Date()
        now.setSeconds(0)
        jsonData.forEach((data) => {
          if (data.start) {
            if (
              new Date(data.timeFrom) < now &&
              new Date(data.timeTo) > now &&
              !data.totalPrice
            ) {
              newStartedReservations.push(data)
              console.log(data)
            }
          }
        })
        if (newStartedReservations.length > 0) {
          setStartedReservations(newStartedReservations)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getMeterValues = async () => {
    try {
      const response = await fetch(
        `${BASE_API}/driver/car/${reservationInput}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        setMeterValues(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getStartedReservations()
    setReservation()
    setForm(false)
  }, [])

  const calculateResult = () => {
    if (meterValues) {
      const batteryCapacity = parseFloat(capacity)
      const batteryStatus = parseFloat(batteryStart)
      const kWhRecharged = parseFloat(meterValues.chargedValue)
      let actualValue = (kWhRecharged / batteryCapacity) * 100 + batteryStatus
      actualValue > 100 ? (actualValue = 100) : (actualValue = actualValue)
      setResult(actualValue.toFixed(2))
    }
  }

  useEffect(() => {
    if (form) {
      calculateResult()
    }
  }, [form])

  const closeReservation = () => {
    getStartedReservations()
    setReservation()
    setReservationInput()
  }

  useEffect(() => {
    if (reservationInput) {
      setReservation(
        startedReservations.find(
          (res) => res.reservationID == reservationInput,
        ),
      )
      getMeterValues()
    }
  }, [reservationInput])

  useEffect(() => {
    if(meterValues) {
      calculateResult()
    }
  }, [meterValues])

  useEffect(() => {
    let intervalId = null
    if (reservation) {
      const started = new Date(reservation.start.start)
      intervalId = setInterval(() => {
        const elapsed = new Date() - started
        const hours = Math.floor(
          (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)
        if (seconds === 0 || seconds === 31) getMeterValues()
        hours > 0
          ? setStopWatch(`${hours}:${minutes}:${seconds}`)
          : setStopWatch(`${minutes}:${seconds}`)
      }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [reservation])

  return (
    <>
      <div
        className={`flex w-full`}
        style={{ height: `calc(${height}px - 3.4rem` }}
      >
        {startedReservations ? (
          <>
            <div className="flex w-full">
              {reservation && meterValues ? (
                <>
                  <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 w-full overflow-hidden">
                    <div className="row-span-1 lg:row-span-1 flex justify-center items-center relative z-10">
                      <div className=" h-full w-full absolute py-6 px-8 lg:w-2/3 lg:h-2/3">
                        <div
                          className="h-full w-full relative flex items-center justify-center text-center border-2 dark:bg-inherit bg-tertiary border-dk-gray rounded-2xl font-semibold text-dk-secondary dark:text-dk-gray hover:bg-dk-primary cursor-pointer"
                          onClick={() => closeReservation()}
                        >
                          <p>All started reservations</p>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-5 lg:row-span-4 relative flex items-center overflow-hidden">
                      <div className="absolute w-full max-sm:right-[-50px] md:inset-0 flex items-center justify-center">
                        <img
                          className="object-contain relative w-full md:w-4/5 lg:w-3/5 z-10"
                          src={carImage}
                        ></img>
                      </div>

                      <div className="absolute max-sm:right-[-10px] right-0 w-full flex">
                        <div className="relative flex items-center justify-center w-full">
                          <div className="flex items-center justify-center bg-gradient-radial from-dk-secondary via-dk-secondary to-dk-gray rounded-full h-[50vw] w-[50vw] md:h-[32vw] md:w-[32vw] lg:h-[30vw] lg:w-[30vw] z-0">
                            <div className="bg-gradient-radial from-dk-secondary via-dk-secondary to-dk-gray rounded-full h-[40vw] w-[40vw] md:h-[28vw] md:w-[28vw] lg:h-[25vw] lg:w-[25vw]  z-0"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-2 md:row-span-4 lg:row-span-3 flex justify-center items-center relative">
                      <div className=" h-full w-full absolute py-2 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3">
                        <div className="bg-dk-gray rounded-3xl h-full w-full relative flex items-center justify-center">
                          {form ? (
                            <>
                              {' '}
                              {result ? (
                                <>
                                  <div className="absolute flex items-center justify-center inset-x-0 z-10 top-2">
                                    <div>
                                      <p className="text-center text-xl font-medium">
                                        {result}% 
                                      </p>
                                      <p className="text-md font-medium text-center text-dk-secondary">
                                      (+
                                        {parseFloat(
                                          meterValues.chargedValue,
                                        ).toFixed(2)}{' '}
                                        kWh)
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    className={`absolute flex bg-gradient-to-t from-dk-gray to-dk-primary rounded-3xl w-full border-[8px] border-dk-gray bottom-0 justify-center items-center`}
                                    style={{
                                      height: `${Math.ceil(
                                        result,
                                      ).toString()}%`,
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="fill-yellow-300"
                                      height="48"
                                      width="48"
                                    >
                                      <path d="M19.95 42 22 27.9h-7.3q-.55 0-.8-.5t0-.95L26.15 6h2.05l-2.05 14.05h7.2q.55 0 .825.5.275.5.025.95L22 42Z" />
                                    </svg>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <>
                              <form onSubmit={() => setForm(true)} className="max-sm:p-2">
                                <div className="md:mb-4">
                                  <label
                                    className="block text-gray-700 font-medium max-sm:text-sm md:mb-2"
                                    htmlFor="batteryStart"
                                  >
                                    Battery Percentage (%)
                                  </label>
                                  <input
                                    className="border border-gray-400 md:p-2 p-1 rounded-lg w-full"
                                    id="batteryStart"
                                    type="number"
                                    value={batteryStart}
                                    placeholder="20"
                                    onChange={(e) =>
                                      setBatteryStart(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="md:mb-4">
                                  <label
                                    className="block text-gray-700 font-medium max-sm:text-sm md:mb-2"
                                    htmlFor="capacity"
                                  >
                                    Maximum Capacity (kWh)
                                  </label>
                                  <input
                                    className="border border-gray-400 md:p-2 p-1 rounded-lg w-full"
                                    id="capacity"
                                    type="number"
                                    value={capacity}
                                    placeholder="50"
                                    onChange={(e) =>
                                      setCapacity(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <button className="bg-dash-black text-white flex w-full mt-2 py-2 justify-center rounded-xl hover:bg-gradient-to-b hover:from-dk-secondary hover:to-dk-nav">
                                  Add Details
                                </button>
                              </form>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row-span-2 md:row-span-3 lg:row-span-2 flex justify-center items-center relative">
                      <div className=" h-full w-full absolute py-2 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3">
                        <div className="bg-dk-gray rounded-3xl h-full w-full flex items-center justify-center relative">
                          <div className="absolute flex flex-col items-center inset-x-0 top-2">
                            <span className="text-lg font-medium">
                              {reservation.connectorTypeName}
                            </span>
                            <div className="flex justify-center px-2 w-full">
                              <div className='flex w-full py-1 bg-dk-primary justify-center rounded-full'>
                                <span className="text-xl font-medium text-tertiary">
                                  {reservation.connectorPower} kW
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute right-0 bottom-0 w-full h-auto">
                            <img
                              className="object-contain absolute right-0 bottom-0 w-4/5 lg:w-3/5 h-auto"
                              src={chademo}
                            ></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-1 flex justify-center items-center relative">
                      <div className=" h-full w-full absolute py-5 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3">
                        <div className="bg-dk-nav rounded-2xl h-full w-full relative flex items-center justify-center">
                          <div>
                            <p className="text-tertiary text-center text-md font-medium">
                              Time passed:
                            </p>
                            <p className="text-tertiary text-center text-lg font-semibold">
                              {stopWatch}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-1 flex justify-center items-center relative">
                      <div className=" h-full w-full absolute py-5 px-8 md:w-4/5 md:h-4/5 lg:w-2/3 lg:h-2/3">
                        <div className="bg-dk-nav rounded-2xl h-full w-full relative flex items-center justify-center">
                          <div>
                            <p className="text-tertiary text-center text-md font-medium">
                              End at:
                            </p>
                            <p className="text-tertiary text-center text-lg font-semibold">
                              {new Date(reservation.timeTo).getHours()}:
                              {new Date(reservation.timeTo).getMinutes()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-full">
                    <div className="flex-col justify-center bg-tertiary p-4 rounded-xl shadow-lg">
                      <p className="text-center">
                        Select a reservation to monitor:
                      </p>
                      {startedReservations.map((reservation) => (
                        <div className="mt-4 w-full flex justify-center">
                          <RadioButton
                            role={reservationInput}
                            name={reservation.reservationID}
                            setRole={setReservationInput}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-lg font-bold dark:text-tertiary text-dk-secondary">
                No available charging processes
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
