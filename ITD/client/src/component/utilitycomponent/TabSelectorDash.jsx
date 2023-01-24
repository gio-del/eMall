import { useEffect } from 'react'
import { useState } from 'react'


export default function TabSelectorDash({ tabs, currentTab, setCurrentTab }) {
  useEffect(() => {
    tabs.map((tab) => {
      document
        .getElementById(tab)
        .classList.remove(
          'md:bg-dash-gray',
          'max-sm:border-dash-black',
        )
      document
        .getElementById(`text-${tab}`)
        .classList.remove('max-sm:font-semibold')
      document
        .getElementById(`text-${tab}`)
        .classList.add('max-sm:font-regular')
    })
    document
      .getElementById(currentTab)
      .classList.add(
        'md:bg-dash-gray',
        'max-sm:border-dash-black',
      )
    document
      .getElementById(`text-${currentTab}`)
      .classList.remove('max-sm:font-regular')
    document
      .getElementById(`text-${currentTab}`)
      .classList.add('max-sm:font-semibold')
  }, [currentTab])

  const handleClick = (tab) => {
    setCurrentTab(tab)
  }

  return (
    <>
      <div className="flex w-full md:w-1/4 h-auto justify-center">
        <div className="flex md:flex-col w-full h-min justify-evenly md:justify-start md:bg-white max-sm:border-b-2 md:rounded-xl md:p-4 md:mt-12 md:mx-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              id={tab}
              className="flex items-center cursor-pointer md:rounded-xl p-4 md:m-2 max-sm:border-b-2"
              onClick={() => handleClick(tab)}
            >
              <p
                id={`text-${tab}`}
                className="text-dash-black text-right text-md md:font-semibold"
              >
                {tab}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
