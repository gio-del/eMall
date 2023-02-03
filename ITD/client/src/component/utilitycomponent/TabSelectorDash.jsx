import { useEffect } from 'react'

export default function TabSelectorDash({ tabs, currentTab, setCurrentTab }) {
  useEffect(() => {
    if (tabs && currentTab) {
      tabs.map((tab) => {
        document
          .getElementById(tab.evcpID)
          .classList.remove('md:bg-dash-gray', 'max-sm:border-dash-black')
        document
          .getElementById(`text-${tab.evcpID}`)
          .classList.remove('max-sm:font-semibold')
        document
          .getElementById(`text-${tab.evcpID}`)
          .classList.add('max-sm:font-regular')
      })
      document
        .getElementById(currentTab.evcpID)
        .classList.add('md:bg-dash-gray', 'max-sm:border-dash-black')
      document
        .getElementById(`text-${currentTab.evcpID}`)
        .classList.remove('max-sm:font-regular')
      document
        .getElementById(`text-${currentTab.evcpID}`)
        .classList.add('max-sm:font-semibold')
    }
  }, [currentTab])

  const handleClick = (tab) => {
    setCurrentTab(tab)
  }

  return (
    <>
      {tabs && (
        <div className="flex w-full h-auto justify-center">
          <div className="flex md:flex-col w-full h-min justify-evenly md:justify-start md:bg-white max-sm:border-b-2 md:rounded-xl md:p-4">
            {tabs &&
              tabs.length > 0 &&
              tabs.map((tab) => (
                <div
                  key={tab.evcpID}
                  id={tab.evcpID}
                  className="flex items-center cursor-pointer md:rounded-xl p-4 md:m-2 max-sm:border-b-2 md:hover:bg-gray-200"
                  onClick={() => handleClick(tab)}
                >
                  <p
                    id={`text-${tab.evcpID}`}
                    className="text-dash-black text-right text-md md:font-semibold"
                  >
                    {tab.name}
                  </p>
                </div>
              ))}
            {tabs && tabs.length === 0 && <div>No EVCPs</div>}
          </div>
        </div>
      )}
    </>
  )
}
