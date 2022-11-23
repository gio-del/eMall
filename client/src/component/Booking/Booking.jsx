import { useEffect } from 'react'
import { useState } from 'react'
import DirectionButtonUtility from '../utilitycomponent/DirectionButtonUtility'
import BookSection from './Book/BookSection'
import CostSection from './Cost/CostSection'
import DetailsSection from './Details/DetailsSection'

export default function Booking({ CPOName, Address, Connectors, Data }) {
  const [currentTab, setCurrentTab] = useState(1)
  const tabs = ['tab-0', 'tab-1', 'tab-2']
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
    <div className="bg-tertiary dark:bg-dk-secondary max-w-lg p-3">
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-medium dark:text-tertiary text-dk-secondary">
            {CPOName}
          </p>
          <p className="font-light dark:text-tertiary text-dk-secondary">
            {Address}
          </p>
        </div>
        <DirectionButtonUtility source={[]} destination={[]} />
      </div>
      <ul className="select-none cursor-pointer inline-flex justify-around w-full dark:text-tertiary text-dk-secondary font-light border-b-2 text-center dark:border-b-tertiary border-b-dk-secondary">
        <li
          id="tab-0"
          onClick={() => setCurrentTab(0)}
          className="mx-2 border-b-0 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary"
        >
          Cost
        </li>
        <li
          id="tab-1"
          onClick={() => setCurrentTab(1)}
          className="mx-2 border-b-0 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary"
        >
          Book
        </li>
        <li
          id="tab-2"
          onClick={() => setCurrentTab(2)}
          className="mx-2 border-b-2 dark:border-b-tertiary border-b-dk-secondary w-1/5 hover:border-b-2 hover:border-b-searchInput dark:hover:border-b-tertiary"
        >
          Details
        </li>
      </ul>
      <div className={(currentTab === 0 ? '' : 'hidden ') + ''}>
        <CostSection />
      </div>
      <div className={(currentTab === 1 ? '' : 'hidden ') + ''}>
        <BookSection />
      </div>
      <div className={(currentTab === 2 ? '' : 'hidden ') + ''}>
        <DetailsSection />
      </div>
    </div>
  )
}
