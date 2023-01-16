import type2 from './../../../assets/socketType2.svg'
import CCS2 from './../../../assets/socketTypeCCS2.svg'
import CCS2dark from './../../../assets/socketTypeCCS2dark.svg'
import DirectionButtonUtility from '../../utilitycomponent/DirectionButtonUtility'
import ConnectorSVG from '../../utilitycomponent/ConnectorSVG'

export default function DrawerContent({
  CPOName,
  Address,
  Connectors,
  Source,
  Destination,
}) {
  return (
    <div className="flex flex-col p-5">
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
      <div className="my-5">
        <button className="py-4 w-full bg-dk-primary rounded-full text-center text-tertiary font-semibold">
          Book a charge
        </button>
      </div>
      <div>
        <p className="dark:text-tertiary text-dk-secondary mb-2">
          Equipment and current status
        </p>
        {Connectors.map((connector) => (
          <div
            key={connector.id}
            className="flex flex-row justify-start border-2 border-dk-secondary dark:border-tertiary rounded-2xl mb-4"
          >
            <ConnectorSVG type={connector.typeName} />
            <div className="p-1 flex flex-row justify-between w-full border-l-2 dark:border-l-tertiary border-l-dk-secondary">
              <div>
                <p className="text-lg font-bold dark:text-tertiary text-dk-secondary mt-1 mb-1 mx-1">
                  {connector.typeName}
                </p>
                <p className="font-medium dark:text-tertiary text-dk-secondary mx-1">
                  {connector.power}kW
                </p>
                <p className="font-light dark:text-tertiary text-dk-secondary mx-1 mb-1">
                  {connector.flatPrice}$+{connector.variablePrice}$/kWh
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button className="p-4 w-full mx-4 bg-dk-primary rounded-2xl text-center text-tertiary font-semibold">
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
