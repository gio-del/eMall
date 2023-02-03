import DirectionButtonUtility from '../../utilitycomponent/DirectionButtonUtility'
import ConnectorSVG from '../../utilitycomponent/ConnectorSVG'
import { useEffect } from 'react'

export default function DrawerContent({ Connectors, setBooking }) {
  const onClick = () => {
    setBooking(true)
  }
  return (
    <div className="flex flex-col max-h-screen w-full p-3">
      <div className="my-3">
        <button
          className="py-3 w-full bg-dk-primary rounded-full text-center text-tertiary font-semibold"
          onClick={() => onClick()}
        >
          Book a charge
        </button>
      </div>
      <div className="mb-2">
        <p className="dark:text-tertiary text-dk-secondary mb-1">
          Equipment and current status
        </p>
        {Connectors.map((connector) => (
          <div
            key={`${connector.typeName}-${connector.power}`}
            className="flex flex-row justify-start border-2 border-dk-secondary dark:border-tertiary rounded-2xl mt-2"
          >
            <ConnectorSVG type={connector.typeName} />
            <div className="p-1 flex flex-row justify-between w-full border-l-2 dark:border-l-tertiary border-l-dk-secondary">
              <div>
                <p className="text-lg font-bold dark:text-tertiary text-dk-secondary mb-1 mx-1">
                  {connector.typeName}
                </p>
                <p className="font-medium dark:text-tertiary text-dk-secondary mx-1">
                  {connector.power}kW
                </p>
                <p className="font-light dark:text-tertiary text-dk-secondary mx-1">
                  {connector.flatPrice}$+{connector.variablePrice}$/kWh
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="p-4 w-full mx-4 border-2 dark:border-dk-gray border-dk-secondary rounded-2xl text-center text-dk-secondary dark:text-tertiary font-semibold"
                >
                  NOW {connector.freeSpots}/{connector.totalSpots}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
