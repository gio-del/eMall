import { useState, useEffect } from 'react'
import TabSelectorDash from '../utilitycomponent/TabSelectorDash'
import { BASE_API } from '../../constant'

export default function EnergyTab({ evcpList }) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [DSOs, setDSOs] = useState()
  const [selectedDSO, setSelectedDSO] = useState()

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
        setDSOs(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

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

  useEffect(() => {
    getDSO()
    getDSOsAvailable()
  }, [currentEvcp])

  return (
    <>
       <div className='md:flex md:justify-between md:mt-8 '>
        <div className='w-1/4 md:mx-8'>
          <TabSelectorDash
            tabs={evcpList}
            currentTab={currentEvcp}
            setCurrentTab={setCurrentEvcp}
          />
        </div>
        <div className='bg-white rounded-xl w-full p-4 md:mx-8'>
          <table className='table-auto w-full text-left text-dash-black'>
            <thead className='bg-dash-gray text-md text-dash-gray-dark uppercase'>
              <tr>
                <th className='px-6 py-3'>ID</th>
                <th className='px-6 py-3'>From</th>
                <th className='px-6 py-3'>To</th>
                <th className='px-6 py-3'>Total Price</th>
                <th className='px-6 py-3'>Socket ID</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>

        </div>
      </div>
      <div>
        <p>Selected DSO</p>
        <p>{selectedDSO && selectedDSO.DSOname}</p>
      </div>
      <div>
        <p>Availalble DSOs</p>
        <p>{DSOs && DSOs.map((dso) => <span>{dso.DSOname}</span>)}</p>
      </div>
    </>
  )
}
