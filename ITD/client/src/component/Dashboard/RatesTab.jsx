import { useState, useEffect } from 'react'
import TabSelectorDash from '../utilitycomponent/TabSelectorDash'
import { BASE_API } from '../../constant'
import FormField from '../utilitycomponent/FormField'
import RadioButton from '../utilitycomponent/RadioButton'

export default function RatesTab({ evcpList }) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [rates, setRates] = useState()
  const [typeName, setTypeName] = useState()
  const [flatPrice, setFlatPrice] = useState()
  const [variablePrice, setVariablePrice] = useState()
  const [error, setError] = useState('')
  const [discount, setDiscount] = useState()
  const [specialOffer, setSpecialOffer] = useState()
  const [addRateOpen, setAddRateOpen] = useState(false)
  const [addSpecialOfferOpen, setAddSpecialRateOpen] = useState(false)

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
        variablePrice: variablePrice,
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      getData()
      setAddRateOpen(false)
    } else response.json().then((data) => setError(data.error))
  }

  const handleSubmitSpecialOffer = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(
      `${BASE_API}/cpo/rate/special/${currentEvcp.evcpID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          discount: discount,
        }),
      },
    )

    if (response.status === 200) {
      console.log(response.headers)
      getSpecialOffer()
    } else response.json().then((data) => setError(data.error))
  }

  const handleDeleteSpecialOffer = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(
      `${BASE_API}/cpo/rate/special/${currentEvcp.evcpID}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          specialOfferID: specialOffer.specialOfferID,
        }),
      },
    )

    if (response.status === 200) {
      console.log(response.headers)
      setSpecialOffer()
      setAddSpecialRateOpen(false)
    } else response.json().then((data) => setError(data.error))
  }

  const getSpecialOffer = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/rate/special/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log(jsonData)
        setSpecialOffer(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (evcpList) {
      setCurrentEvcp(evcpList[0])
    }
  }, [])

  useEffect(() => {
    getData()
    getSpecialOffer()
    setAddRateOpen(false)
    setAddSpecialRateOpen(false)
    setSpecialOffer()
  }, [currentEvcp])

  const addRate = () => {
    setAddRateOpen(true)
  }

  const addSpecialOffer = () => {
    setAddSpecialRateOpen(true)
  }

  return (
    <>
      <div className="md:flex md:justify-between md:mt-8 w-full h-[calc(100%-10rem)] overflow-y-scroll">
        <div className="w-1/4 md:mx-8">
          <TabSelectorDash
            tabs={evcpList}
            currentTab={currentEvcp}
            setCurrentTab={setCurrentEvcp}
          />
        </div>
        <div className="flex-col w-full mx-8">
          {specialOffer && specialOffer ? (
            <>
              <div className="bg-white border-4 border-dash-red rounded-xl w-full p-4 flex-col max-h-min mb-4">
                <p className="text-lg font-semibold text-center">
                  Special Offer
                </p>
                <p className="text-md font-semibold text-center italic">
                  {specialOffer.discount}% OFF
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="bg-white rounded-xl w-full p-4 flex-col max-h-min">
            <p className="text-lg font-semibold text-center">Actual Rates</p>
            <table className="table-auto w-full text-left text-dash-black my-4">
              <thead className="bg-dash-gray text-md text-dash-gray-dark uppercase">
                <tr>
                  <th className="px-6 py-3">Variable Price €/kWh</th>
                  <th className="px-6 py-3">Flat Price €/h</th>
                  <th className="px-6 py-3">Connector</th>
                </tr>
              </thead>
              <tbody>
                {rates &&
                  rates.map((rate) => (
                    <>
                      <tr className="border-b border-dash-gray">
                        {specialOffer && specialOffer ? (
                          <>
                            <td className="px-6 py-4">
                              <span className="line-through mr-4">
                                {rate.variablePrice}
                              </span>
                              <span>
                                {rate.variablePrice -
                                  (rate.variablePrice * specialOffer.discount) /
                                    100}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="line-through mr-4">
                                {rate.flatPrice}
                              </span>
                              <span>
                                {rate.flatPrice -
                                  (rate.flatPrice * specialOffer.discount) /
                                    100}
                              </span>
                            </td>
                            <td className="px-6 py-4">{rate.typeName}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4">{rate.variablePrice}</td>
                            <td className="px-6 py-4">{rate.flatPrice}</td>
                            <td className="px-6 py-4">{rate.typeName}</td>
                          </>
                        )}
                      </tr>
                      <span></span>
                    </>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between gap-4">
            <div className="w-full">
              {addRateOpen && addRateOpen ? (
                <>
                  <form
                    id="addRate"
                    className="bg-white p-4 w-full rounded-xl mt-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col mb-2">
                      <p className="block text-md text-gray-700 font-medium mb-2">
                        Select a Type
                      </p>
                      <div className="flex gap-4">
                        <RadioButton
                          role={typeName}
                          name="Type2"
                          setRole={setTypeName}
                        />
                        <RadioButton
                          role={typeName}
                          name="CCS2"
                          setRole={setTypeName}
                        />
                      </div>
                    </div>
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
                    <button className="bg-dash-black text-white py-2 px-4 rounded-lg hover:bg-gradient-to-b hover:from-dk-secondary hover:to-dk-nav">
                      Add Rate
                    </button>
                    {error && (
                      <p className="text-red-500 text-xs italic">{error}</p>
                    )}
                  </form>
                </>
              ) : (
                <>
                  <div
                    id="toAddRate"
                    className="bg-dash-black cursor-pointer rounded-xl p-2 text-dash-gray text-center w-auto m-4 hover:bg-gradient-to-b hover:from-dk-secondary hover:to-dk-nav"
                    onClick={() => addRate()}
                  >
                    <p>Add Rate</p>
                  </div>
                </>
              )}
            </div>

            <div className="w-full">
              {specialOffer && specialOffer ? (
                <>
                  <div
                    id="toAddSpecialOffer"
                    className="bg-dash-black cursor-pointer rounded-xl p-2 text-dash-gray text-center w-auto m-4 hover:bg-gradient-to-b hover:from-dk-secondary hover:to-dk-nav"
                    onClick={(e) => handleDeleteSpecialOffer(e)}
                  >
                    <p>Delete Special Offer</p>
                  </div>
                </>
              ) : (
                <>
                  {addSpecialOfferOpen && addSpecialOfferOpen ? (
                    <>
                      <form
                        id="addSpecialOffer"
                        className="bg-white p-4 w-full rounded-xl mt-4"
                        onSubmit={handleSubmitSpecialOffer}
                      >
                        <FormField
                          id="discount"
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        >
                          Add a discount (%)
                        </FormField>
                        <button className="bg-dash-black text-white py-2 px-4 rounded-lg hover:bg-gradient-to-b hover:from-dk-secondary hover:to-dk-nav">
                          Add Special Offer
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <div
                        id="toAddSpecialOffer"
                        className="bg-dash-black cursor-pointer rounded-xl p-2 text-dash-gray text-center w-auto m-4 hover:bg-gradient-to-b hover:from-dk-secondary hover:to-dk-nav"
                        onClick={() => addSpecialOffer()}
                      >
                        <p>Add Special Offer</p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
