import { useState, useEffect } from "react";
import TabSelectorDash from "../utilitycomponent/TabSelectorDash";
import { BASE_API } from "../../constant";
import FormField from "../utilitycomponent/FormField";

export default function RatesTab({evcpList}) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [rates, setRates] = useState()
  const [typeName, setTypeName] = useState()
  const [flatPrice, setFlatPrice] = useState()
  const [variablePrice, setVariablePrice] = useState()
  const [error, setError] = useState('')


  const getData = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/rate/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log(jsonData)
        setRates(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/cpo/rate/${currentEvcp.evcpID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        typeName: typeName,
        flatPrice: flatPrice,
        variablePrice: variablePrice
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      getData()
      document.getElementById("addRate").classList.add("hidden")
    document.getElementById("toAddRate").classList.remove("hidden")

    } else response.json().then((data) => setError(data.error))
  }

  useEffect(() => {
    getData()
  }, [currentEvcp])

  const addRate = () => {
    document.getElementById("addRate").classList.remove("hidden")
    document.getElementById("toAddRate").classList.add("hidden")
  }

  return <>
    <div className='md:flex md:justify-between md:mt-8'>
      <div className='w-1/4 md:mx-8'>
        <TabSelectorDash
          tabs={evcpList}
          currentTab={currentEvcp}
          setCurrentTab={setCurrentEvcp}
        />
      </div>
      <div className='bg-white rounded-xl w-full p-4 md:mx-8 flex-col h-full'>
        <p className="text-lg font-semibold text-center">Actual Rates</p>
        <table className='table-auto w-full text-left text-dash-black my-4'>
          <thead className='bg-dash-gray text-md text-dash-gray-dark uppercase'>
            <tr>
              <th className='px-6 py-3'>Variable Price</th>
              <th className='px-6 py-3'>Flat Price</th>
              <th className='px-6 py-3'>Connector</th>
            </tr>
          </thead>
          <tbody>
            {rates &&
              rates.map((rate) => (
                <>
                  <tr className='border-b border-dash-gray'>
                    <td className='px-6 py-4'>{rate.variablePrice}</td>
                    <td className='px-6 py-4'>{rate.flatPrice}</td>
                    <td className='px-6 py-4'>{rate.typeName}</td>
                  </tr>
                  <span></span>
                </>))}
          </tbody>
        </table>
        <div id="toAddRate"
        className="bg-dash-black rounded-xl p-2 text-dash-gray text-center w-1/4 m-4"
        onClick={() => addRate()}
        >
          <p>Add Rate</p>
        </div>
        <form id="addRate" className='hidden' onSubmit={handleSubmit}>
            <FormField
              id="typeName"
              type="typeName"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            >
              Type Name
            </FormField>
            <FormField
              id="flatPrice"
              type="flatPrice"
              value={flatPrice}
              onChange={(e) => setFlatPrice(e.target.value)}
            >
              Flat Price
            </FormField>
            <FormField
              id="variablePrice"
              type="variablePrice"
              value={variablePrice}
              onChange={(e) => setVariablePrice(e.target.value)}
            >
              Variable Price
            </FormField>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Add Rate
            </button>
          </form>
      </div>
    </div>
  </>
}
