import { useEffect } from 'react'
import { useState } from 'react'
import BookSection from './Book/BookSection'
import CostSection from './Cost/CostSection'

export default function Booking({ Connectors, Date, id }) {
  const [currentTab, setCurrentTab] = useState(1)
  const tabs = ['tab-0', 'tab-1']
  useEffect(() => {
    tabs.map((tab) => {
      document.getElementById(tab).classList.remove('border-b-2')
      document.getElementById(tab).classList.add('border-b-0')
      document.getElementById(tab).classList.remove('font-bold')
    })
    const element = 'tab-' + currentTab
    document.getElementById(element).classList.add('border-b-2')
    document.getElementById(element).classList.remove('border-b-0')
    document.getElementById(element).classList.toggle('font-bold')
  }, [currentTab])

  return (
    <div className="bg-tertiary dark:bg-dk-secondary max-h-screen mt-6">
      <ul className="select-none cursor-pointer inline-flex justify-around w-full dark:text-tertiary text-dk-secondary font-light border-b-2 text-center dark:border-b-tertiary border-b-dk-secondary">
        <li
          id="tab-0"
          onClick={() => setCurrentTab(0)}
          className="text-lg mx-2 border-b-0 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary"
        >
          Cost
        </li>
        <li
          id="tab-1"
          onClick={() => setCurrentTab(1)}
          className="text-lg mx-2 border-b-0 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary"
        >
          Book
        </li>
      </ul>
      <div className={(currentTab === 0 ? '' : 'hidden ') + ''}>
        <CostSection connectors={Connectors} />
      </div>
      <div className={(currentTab === 1 ? '' : 'hidden ') + ''}>
        <BookSection connectors={Connectors} date={Date} id={id} />
      </div>
    </div>
  )
}
