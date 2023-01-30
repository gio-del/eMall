import { useState, useEffect } from 'react'
  import TabSelectorDash from '../utilitycomponent/TabSelectorDash'
import FormField from '../utilitycomponent/FormField'
import { BASE_API } from '../../constant'

export default function ChargingPointsTab({ evcpList , setEvcpList}) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [cps, setCps] = useState()
  const [name, setName] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [address, setAddress] = useState()
  const [ID, setID] = useState()
  const [power, setPower] = useState()
  const [type, setType] = useState()
  const [error, setError] = useState('')


  const getData = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/cp/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log(jsonData)
        setCps(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [currentEvcp])


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
      setEvcpList([]);
      document.getElementById("addEVCP").classList.add("hidden")
      document.getElementById("toAddEVCP").classList.remove("hidden")

    } else response.json().then((data) => setError(data.error))
  }

  const handleSubmitCP = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/cp/${currentEvcp.evcpID}`, {
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
      setEvcpList([]);
      document.getElementById("addEVCP").classList.add("hidden")
      document.getElementById("toAddEVCP").classList.remove("hidden")

    } else response.json().then((data) => setError(data.error))
  }


  const addEVCP = () => {
    document.getElementById("addEVCP").classList.remove("hidden")
    document.getElementById("toAddEVCP").classList.add("hidden")
  }

  return (
    <>
       <div className='md:flex md:justify-between md:mt-8 '>
        <div className='w-1/4 md:mx-8'>
          <div className=''>
            <TabSelectorDash
              tabs={evcpList}
              currentTab={currentEvcp}
              setCurrentTab={setCurrentEvcp}
            />
          </div>
          <div id="toAddEVCP" className='bg-dash-black cursor-pointer rounded-xl mt-8 p-2 flex justify-center text-dash-gray'
          onClick={() => addEVCP()}>
            <p>Add an EVCP</p>
          </div>
          <form id="addEVCP" className='hidden p-4 bg-white mt-4 rounded-xl' onSubmit={handleSubmit}>
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
        
        <div className='grid grid-cols-2 h-full w-full gap-4 md:mx-8'>
              {cps &&
                cps.map((cp) => (
                  <>
                    <div className='bg-white rounded-xl flex justify-center items-center w-full p-4'>
                      <div className='row-span-1 inset-0 flex h-full right-0 w-full text-center'>
                        <div className='flex justify-center items-center w-full'>
                          <div>
                            <p className='font-medium'>Charging Point {cp.cp_id}</p>
                            <p className='font-medium'>Power</p>
                            <p>{cp.power_kw} kW</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>))}
          <div id="addCP" className='hidden bg-dash-black rounded-xl cursor-pointer flex justify-center items-center w-full'>
            <div  className='row-span-1 inset-0 flex h-full right-0 w-full text-center '>
              <div className='flex justify-center items-center w-full'>
                <div>
                  <p className='font-medium text-dash-gray '>Add Charging Point</p>
                </div>
              </div>
            </div>
          </div>
          <div id="toAddCP" className='bg-white row-span-2 col-span-2 rounded-xl cursor-pointer flex justify-center items-center w-full'>
            <div className=' flex h-full right-0 w-full px-8 py-4'>
              <div className='flex-col justify-center items-center w-full'>
                <div>
                  <p className='font-medium text-lg text-dash-gray-dark text-center'>Add Charging Point</p>
                </div>
                
                <form className='p-4 bg-white mt-4 rounded-xl' onSubmit={handleSubmitCP}>
                  <FormField
                    id="ID"
                    type="ID"
                    value={ID}
                    onChange={(e) => setID(e.target.value)}
                  >
                    <div>
                      <p className='font-medium text-md text-dash-black '>ID of the charging station</p>
                      <p className='font-light text-sm text-dash-gray-dark '>In order to establish a connection between your account and you charging point it is needed to provide the identifier for your charging point, this is usually the charging point's serial number</p>
                    </div>
                  </FormField>
                  <FormField
                    id="power"
                    type="power"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                  >
                    Power
                  </FormField>
                  <FormField
                    id="type"
                    type="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    Type
                  </FormField>

                  <button className="bg-dash-black text-white py-2 px-4 rounded-lg">
                    Add the charging point
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
