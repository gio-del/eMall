import { useState, useEffect } from 'react'
import TabSelectorDash from '../utilitycomponent/TabSelectorDash'
import { BASE_API } from '../../constant'
import FormField from '../utilitycomponent/FormField'

export default function EnergyTab({ evcpList }) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [DSOs, setDSOs] = useState()
  const [selectedDSO, setSelectedDSO] = useState()
  const [newDSO, setNewDSO] = useState("Select New DSO")
  const [drawerOpen, setDrawerOpen] = useState("")
  const [error, setError] = useState('')
  const [batteryKey, setBatteryKey] = useState()
  const [newMode, setNewMode] = useState()
  const [myMode, setMyMode] = useState()
  const [modes, setModes] = useState()

  const getDSO = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/energy/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log('json', jsonData)
        setSelectedDSO(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  const getDSOsAvailable = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/energy/dso/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log('json', jsonData)
        setDSOs(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/energy/dso/${currentEvcp.evcpID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        dsoID: newDSO.dsoID
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      getDSO()
    } else response.json().then((data) => setError(data.error))
  }

  const handleSubmitBatteryKey = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/energy/battery/${currentEvcp.evcpID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        batteryKey: batteryKey
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      getAllModes()
    } else response.json().then((data) => setError(data.error))
  }

  const getAllModes = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/energy/mode/`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log('json', jsonData)
        setModes(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmitMode = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/energy/mode/${currentEvcp.evcpID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        modeId : mode.id,
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      getBatteryMode()
    } else response.json().then((data) => setError(data.error))
  }

  const getBatteryMode = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/energy/mode/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log('json', jsonData)
        setMyMode(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getDSO()
    getDSOsAvailable()
    setNewDSO("")

  }, [currentEvcp])

  const openDropdown = () => {
    drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true)
  }

  useEffect(() => {
    if(DSOs) {
      if(drawerOpen === true) {
        document.getElementById("dropdownRadioBgHover").classList.remove("hidden") 
      } else {
        document.getElementById("dropdownRadioBgHover").classList.add("hidden")
      }
    }
    
  }, [drawerOpen])

  useEffect(() => {
    if(evcpList) {
      setCurrentEvcp(evcpList[0])
    }
  }, [])

  return (
    <>
      <div className="md:flex md:justify-between md:mt-8 h-[calc(100%-10rem)] overflow-y-scroll">
        <div className="w-1/4 md:mx-8 mt-4">
          <TabSelectorDash
            tabs={evcpList}
            currentTab={currentEvcp}
            setCurrentTab={setCurrentEvcp}
          />
        </div>
        <div className="w-full flex-col max-h-min md:mx-8 mt-4">
          <div className="bg-white rounded-xl p-4 w-auto">
            <p className="text-center text-lg font-medium">Energy Prices</p>
            <table className=" w-full text-left text-dash-black my-4">
              <thead className="bg-dash-gray text-md text-dash-gray-dark uppercase">
                <tr>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Price €/kWh</th>
                  <th className="px-6 py-3">Minimum Contract Until</th>
                </tr>
              </thead>
              <tbody>
                {DSOs &&
                  DSOs.map((dso) => (
                    <>
                      <tr className="border-b border-dash-gray">
                        <td className="px-6 py-4">{dso.DSOname}</td>
                        <td className="px-6 py-4">{dso.DSOprice}</td>
                        <td className="px-6 py-4">{`${new Date(
                          dso.DSOexpiry
                        ).getUTCDate()}-${new Date(
                          dso.DSOexpiry
                        ).getUTCMonth()}-${new Date(
                          dso.DSOexpiry
                        ).getUTCFullYear()}`}</td>
                      </tr>
                      <span></span>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-xl p-4 w-auto mt-4">
            <p className="text-center text-lg font-medium">Actual Contract</p>
            <table className=" w-full text-left text-dash-black my-4">
              <thead className="bg-dash-gray text-md text-dash-gray-dark uppercase">
                <tr>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Price €/kWh</th>
                  <th className="px-6 py-3">Minimum Contract Until</th>
                </tr>
              </thead>
              <tbody>
                {selectedDSO && (
                  <>
                    <tr className="border-b border-dash-gray">
                      <td className="px-6 py-4">{selectedDSO.DSOname}</td>
                      <td className="px-6 py-4">{selectedDSO.DSOprice}</td>
                      <td className="px-6 py-4">{`${new Date(
                        selectedDSO.DSOexpiry
                      ).getUTCDate()}-${new Date(
                        selectedDSO.DSOexpiry
                      ).getUTCMonth()}-${new Date(
                        selectedDSO.DSOexpiry
                      ).getUTCFullYear()}`}</td>
                    </tr>
                    <span></span>
                  </>
                )}
              </tbody>
            </table>
            <div className="w-auto flex justify-evenly">
              {selectedDSO && new Date(selectedDSO.DSOexpiry) < new Date() ? (
                <>
                  <div className="flex justify-start">
                    <div className="w-auto p-2 ">
                      <p className="text-dash-black font-medium text-sm">
                        To change the contract select one of the availables:
                      </p>
                    </div>
                    <div className="">
                      <div
                        onClick={openDropdown}
                        className="bg-white border-2 rounded-xl border-dash-gray p-2 text-sm flex"
                      >
                        <p>
                          {newDSO && newDSO != ""
                            ? newDSO.DSOname
                            : "Select DSO"}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          width="24"
                        >
                          <path d="m12 15-5-5h10Z" />
                        </svg>{" "}
                      </div>
                      <div
                        id="dropdownRadioBgHover"
                        class="hidden relative flex justify-center"
                      >
                        <ul class=" bg-white rounded-xl shadow-lg absolute p-3 space-y-1 text-sm text-gray-700">
                          {DSOs &&
                            DSOs.map((dso) => (
                              <>
                                <li>
                                  <div
                                    class="flex items-center p-2 rounded hover:bg-gray-100"
                                    onChange={() => setNewDSO(dso)}
                                  >
                                    <input
                                      id={`dso-${dso.DSOname}`}
                                      type="radio"
                                      value={dso.DSOname}
                                      name="default-radio"
                                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                    />
                                    <label
                                      for={`dso-${dso.DSOname}`}
                                      class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                                    >
                                      {dso.DSOname}
                                    </label>
                                  </div>
                                </li>
                              </>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {newDSO && newDSO != "" ? (
                    <div
                      onClick={handleSubmit}
                      className="cursor-pointer h-full bg-green-600 font-medium text-sm text-white w-auto rounded-xl p-2 "
                    >
                      <p>Change Contract</p>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </>
              ) : (
                <div className="border-2 border-dash-gray rounded-full">
                  <p>Cannot change</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <form
              id="addBattery"
              className="hidden"
              onSubmit={handleSubmitBatteryKey}
            >
              <FormField
                id="batteryKey"
                type="batteryKey"
                value={batteryKey}
                onChange={(e) => setBatteryKey(e.target.value)}
              >
                Battery Key
              </FormField>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Add Battery Key
              </button>
            </form>
          </div>
          {myMode && myMode ? (
            <>
              <div className="bg-white p-4 rounded-xl">
                <p>{myMode}</p>
              </div>
            </>
          ) : (
            <></>
          )}
          {modes ? (
            <>
              <div>
                <form
                  id="addBattery"
                  className="hidden"
                  onSubmit={handleSubmitMode}
                >
                  <div className="flex flex-row justify-center gap-10">
                    {modes.map((modality) => (
                      <RadioButton
                        role={modality.name}
                        name={modality.name}
                        setRole={setNewMode}
                      />
                    ))}
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Select Battery Mode
                  </button>
                </form>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
