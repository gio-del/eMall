import DirectionButtonUtility from '../../utilitycomponent/DirectionButtonUtility'
import ConnectorSVG from '../../utilitycomponent/ConnectorSVG'

export default function DrawerContent({
  CPOName,
  Address,
  Connectors,
  Source,
  Destination,
  setBooking,
}) {
  const onClick = () => {
    setBooking(true)
  }
  return (
    <div className="flex flex-col px-3">
      <div className="flex justify-between">
        <div>
          <p className="font-medium dark:text-tertiary text-dk-secondary">
            {CPOName}
          </p>
          <p className="font-light  dark:text-tertiary text-dk-secondary">
            {Address}
          </p>
        </div>
        <DirectionButtonUtility
          source={[Source.latitude, Source.longitude]}
          destination={[Destination.latitude, Destination.longitude]}
        />
      </div>
      <div className="my-3">
        <button
          className="py-3 md:py-4 w-full bg-dk-primary rounded-full text-center text-tertiary font-semibold"
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
            key={connector.socketID}
            className="flex flex-row justify-start border-2 border-dk-secondary dark:border-tertiary rounded-2xl mb-2"
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
                <button
                  className="p-4 w-full mx-4 bg-dk-primary rounded-2xl text-center text-tertiary font-semibold"
                  onClick={() => onClick()}
                >
                  NOW {connector.freeSpots}/{connector.totalSpots}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
