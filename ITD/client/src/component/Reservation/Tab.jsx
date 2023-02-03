import SingleReservation from './SingleReservation'
import TabSelector from '../utilitycomponent/TabSelector'

export default function Tab({ currentTab, setCurrentTab, reservations, handleStart }) {
  return (
    <>
      <div className="flex items-center justify-center m-4 md:m-8">
        <p className="font-medium text-2xl dark:text-tertiary text-dk-secondary">
          My Reservation
        </p>
      </div>
      <div className="max-sm:flex-col md:flex  md:h-[calc(100%-6rem)]">
        <TabSelector
          tabs={['Upcoming', 'Past']}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <div className="flex w-full justify-center h-min">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 w-full overflow-hidden mx-6">
            {reservations.map((reservation, idx) => (
              <SingleReservation key={idx} reservation={reservation} handleStart={handleStart}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
