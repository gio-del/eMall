import { useEffect } from 'react'
import { useState } from 'react'
import Past from '../Reservation/SVGs/Past'
import Upcoming from '../Reservation/SVGs/Upcoming'

function getSVGtab(tab) {
  switch (tab) {
    case 'Upcoming':
      return <Upcoming id={`svg-${tab}`} className={'dark:fill-tertiary'} />
    case 'Past':
      return <Past id={`svg-${tab}`} className={'dark:fill-tertiary'} />
    default:
      break
  }
}

export default function TabSelector({ tabs, currentTab, setCurrentTab }) {
  useEffect(() => {
    tabs.map((tab) => {
      document
        .getElementById(tab)
        .classList.remove(
          'md:bg-dk-secondary',
          'max-sm:border-tertiary',
          'md:border-dk-secondary',
        )
      document
        .getElementById(tab)
        .classList.add('max-sm:border-dk-secondary', 'md:border-searchInput')
      document
        .getElementById(`svg-${tab}`)
        .classList.remove('dark:fill-tertiary')
      document
        .getElementById(`svg-${tab}`)
        .classList.add('dark:fill-dk-secondary')
      document
        .getElementById(`text-${tab}`)
        .classList.remove('md:dark:text-tertiary', 'max-sm:font-semibold')
      document
        .getElementById(`text-${tab}`)
        .classList.add('md:dark:text-dk-secondary', 'max-sm:font-regular')
    })
    document
      .getElementById(currentTab)
      .classList.add(
        'md:bg-dk-secondary',
        'max-sm:border-tertiary',
        'md:border-dk-secondary',
      )
    document
      .getElementById(currentTab)
      .classList.remove('max-sm:border-dk-secondary', 'md:border-searchInput')
    document
      .getElementById(`svg-${currentTab}`)
      .classList.remove('dark:fill-dk-secondary')
    document
      .getElementById(`svg-${currentTab}`)
      .classList.add('dark:fill-tertiary')
    document
      .getElementById(`text-${currentTab}`)
      .classList.remove('md:dark:text-dk-secondary', 'max-sm:font-regular')
    document
      .getElementById(`text-${currentTab}`)
      .classList.add('md:dark:text-tertiary', 'max-sm:font-semibold')
  }, [currentTab])

  const handleClick = (tab) => {
    setCurrentTab(tab)
  }

  return (
    <>
      <div className="flex w-full md:w-1/3 h-auto justify-center">
        <div className="flex md:flex-col w-full h-min justify-evenly md:justify-start md:bg-searchInput max-sm:border-b-2 md:rounded-2xl md:p-4 md:mt-12 md:mx-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              id={tab}
              className="flex items-center cursor-pointer md:rounded-xl p-2 md:m-2 max-sm:border-b-2 md:border-2 hover:border-dk-secondary"
              onClick={() => handleClick(tab)}
            >
              <div className="max-sm:hidden flex items-center justify-center">
                {getSVGtab(tab)}
              </div>
              <p
                id={`text-${tab}`}
                className="max-sm:dark:text-tertiary text-right text-md md:font-semibold"
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
