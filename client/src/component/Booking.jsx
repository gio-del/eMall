import DirectionButtonUtility from './utilitycomponent/DirectionButtonUtility'

export default function Booking({ CPOName, Address, Connectors, Data }) {
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
    </div>
  )
}
