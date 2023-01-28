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
      <div>
        <p>Selected DSO</p>
        <p>{selectedDSO && selectedDSO.DSOname}</p>
      </div>
      <div>
        <p>Availalble DSOs</p>
        <p>{DSOs && DSOs.map((dso) => <span>{dso.DSOname}</span>)}</p>
      </div>
      <TabSelectorDash
        tabs={evcpList}
        currentTab={currentEvcp}
        setCurrentTab={setCurrentEvcp}
      />
    </>
  )
}
