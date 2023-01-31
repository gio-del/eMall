import { useState, useEffect } from 'react'
import TabSelectorDash from '../utilitycomponent/TabSelectorDash'
import FormField from '../utilitycomponent/FormField'
import { BASE_API } from '../../constant'
import RadioButton from '../utilitycomponent/RadioButton'

export default function ChargingPointsTab({ evcpList, setEvcpList }) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [evcp, setEvcp] = useState()
  const [name, setName] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [address, setAddress] = useState()
  const [power, setPower] = useState()
  const [type, setType] = useState()
  const [cpID, setCpID] = useState()
  const [error, setError] = useState('')
  const [cpForm, setCpForm] = useState()
  const [lastCpForm, setLastCpForm] = useState()
  
  const getData = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(`${BASE_API}/cpo/cp/${currentEvcp.evcpID}`, {
        credentials: 'include',
      })
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log(jsonData)
        setEvcp(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(cpForm) {
      if(lastCpForm) {
        document.getElementById(`openForm-${lastCpForm}`).classList.remove("hidden")
        document.getElementById(`form-${lastCpForm}`).classList.add("hidden")
      }
      document.getElementById(`openForm-${cpForm}`).classList.remove("hidden")
      document.getElementById(`form-${cpForm}`).classList.add("hidden")
    }
    getData()
    setCpForm("")
    setLastCpForm("")
  }, [currentEvcp])

  useEffect(() => {
    if(cpForm){
      if(lastCpForm) {
        document.getElementById(`openForm-${lastCpForm}`).classList.remove("hidden")
        document.getElementById(`form-${lastCpForm}`).classList.add("hidden")
      }
      document.getElementById(`openForm-${cpForm}`).classList.add("hidden")
      document.getElementById(`form-${cpForm}`).classList.remove("hidden")
      setLastCpForm(cpForm)
    }
  }, [cpForm])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/cp/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        latitude: latitude,
        longitude: longitude,
        address: address,
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      setEvcpList([])
      document.getElementById('addEVCP').classList.add('hidden')
      document.getElementById('toAddEVCP').classList.remove('hidden')
    } else response.json().then((data) => setError(data.error))
  }

  const handleSubmitSocket = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/cp/socket/${cpID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        power: power,
        type: type,
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      getData()
      setCpForm()
      setLastCpForm()
    } else response.json().then(console.log(data.error))
  }

  const createCP = async () => {
    setError('')
    const response = await fetch(`${BASE_API}/cpo/cp/${currentEvcp.evcpID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    if (response.status === 200) {
      console.log(response.headers)
      getData()
    } else response.json().then((data) => setError(data.error))
  }

  const addEVCP = () => {
    document.getElementById('addEVCP').classList.remove('hidden')
    document.getElementById('toAddEVCP').classList.add('hidden')
  }

  

  return (
    <>
      <div className="md:flex md:justify-between md:mt-8 h-[calc(100%-10rem)] overflow-y-scroll">
        <div className="w-1/4 md:mx-8 mt-4 overflow-y-scroll">
          <div className="">
            <TabSelectorDash
              tabs={evcpList}
              currentTab={currentEvcp}
              setCurrentTab={setCurrentEvcp}
            />
          </div>
          <div
            id="toAddEVCP"
            className="bg-dash-black cursor-pointer rounded-xl mt-8 p-2 flex justify-center text-dash-gray"
            onClick={() => addEVCP()}
          >
            <p>Add an EVCP</p>
          </div>
          <form
            id="addEVCP"
            className="hidden p-4 bg-white mt-4 rounded-xl"
            onSubmit={handleSubmit}
          >
            <FormField
              id="name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              name
            </FormField>
            <FormField
              id="latitude"
              type="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            >
              latitude
            </FormField>
            <FormField
              id="longitude"
              type="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            >
              longitude
            </FormField>
            <FormField
              id="address"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              address
            </FormField>

            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Add EVCP
            </button>
          </form>
        </div>

        <div className="flex-col max-h-min w-full md:mx-8">
          {evcp &&
            evcp.cps.map((cp) => (
              <>
                <div className="col-span-2 bg-white rounded-xl flex justify-center items-center h-min w-full mt-4">
                  <div className=" flex h-auto right-0 w-full text-center">
                    <div className="flex justify-center items-center w-full">
                      <div className="w-full flex-col">
                        <div className="border-b-2 py-2">
                          <p className="font-medium ">
                            Charging Point {cp.cpID}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full max-h-max my-2">
                          {cp.sockets.map((socket) => (
                            <div className="flex-col relative border-r-2">
                              <p className="font-semibold">Socket </p>
                              <p className="font-semibold">{socket.type}</p>
                              <p>Actual State</p>
                              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-max m-4 items-center justify-center">
                                <div className="border-2 border-dash-black col-span-2 rounded-xl p-2">
                                  <p className="text-dash-black">Status</p>
                                  <p className="text-dash-black">Operative</p>
                                </div>
                                <div className="bg-dash-black rounded-xl p-2">
                                  <p className="text-dash-gray">Power</p>
                                  <p className="text-dash-gray">24.1kW</p>
                                </div>
                                <div className="bg-dash-black rounded-xl p-2">
                                  <p className="text-dash-gray">Battery</p>
                                  <p className="text-dash-gray">50%</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {cp.sockets.length < 2 ? (
                            <>
                              <div id={`openForm-${cp.cpID}`} className={`${cp.sockets.length == 0 ? "col-span-2" : "col-span-1 openForm h-full"}`}>
                                <div className='flex justify-center items-center h-full'>
                                  <div className='cursor-pointer hover:bg-gray-400 border-2 border-dash-black rounded-2xl p-4'
                                    onClick={() => setCpForm(cp.cpID)}
                                  >
                                    <div className='flex justify-center'>
                                      <svg className='justify-center' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" /></svg>
                                    </div>
                                    <p className='text-center'>Add a Socket</p>
                                  </div>

                                </div>
                              </div>
                              <div id={`form-${cp.cpID}`} className={`${cp.sockets.length == 0 ? "col-span-2" : "col-span-1"} hidden form`}>
                                <div className="bg-white row-span-2 col-span-2 rounded-xl cursor-pointer flex justify-center items-center w-full">
                                  <div className=" flex h-full right-0 w-full px-8 py-4">
                                    <div className="flex-col justify-center items-center w-full">
                                      <div>
                                        <p className="font-medium text-md text-dash-black text-center">
                                          Add Charging Point
                                        </p>
                                      </div>

                                      <form
                                        className="bg-white mt-4 rounded-xl"
                                        onSubmit={handleSubmitSocket}
                                      >
                                        <FormField
                                          id={'power'}
                                          type="power"
                                          value={power}
                                          onChange={(e) =>
                                            setPower(e.target.value)
                                          }
                                        >
                                          Power (kW)
                                        </FormField>
                                        <p className="block text-gray-700 font-medium mb-2">
                                          Type
                                        </p>
                                        <div className="flex flex-row justify-center gap-10">
                                          <RadioButton
                                            role={type}
                                            name="Type2"
                                            setRole={setType}
                                          />
                                          <RadioButton
                                            role={type}
                                            name="CCS2"
                                            setRole={setType}
                                          />
                                        </div>

                                        <button
                                          className="bg-dash-black text-white mt-4 py-2 px-4 rounded-lg"
                                          onClick={() => setCpID(cp.cpID)}
                                        >
                                          Add the Socket
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </>

                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          {currentEvcp && currentEvcp ? (
            <div
              className="bg-dash-black text-dash-gray col-span-2 text-center py-4 rounded-xl cursor-pointer mt-4"
              onClick={() => createCP()}
            >
              Add a Charging Point
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}
