import ConnectorSVG from '../../utilitycomponent/ConnectorSVG'

export default function CostSection({ connectors }) {
  return (
    <>
      <div className="flex flex-col px-3 w-full">
        {connectors.map((connector) => (
          <div
            className="flex-grow"
            key={`${connector.typeName}-${connector.power}`}
          >
            <div className="flex p-4">
              <div className="flex flex-col border-2 rounded-2xl border-tertiary px-6">
                <div className="flex flex-grow items-center justify-center">
                  <span className="text-center text-lg font-bold align-middle dark:text-tertiary">
                    {connector.typeName}
                  </span>
                </div>
                <div className="flex flex-grow items-center justify-center">
                  <ConnectorSVG type={connector.typeName} />
                </div>
                <div className="flex flex-grow items-center justify-center">
                  <p className="text-center text-lg font-bold dark:text-tertiary">
                    {connector.typeName === 'CCS2' ? 'DC' : 'AC'}
                  </p>
                </div>
              </div>

              <div className="flex-col mx-auto py-4">
                <div className="my-2">
                  <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">
                    Maximum output power
                  </p>
                  <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">
                    {connector.power}
                  </p>
                </div>
                <div className="my-2">
                  <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">
                    Cost for charging
                  </p>
                  <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">
                    {connector.variablePrice}
                  </p>
                </div>
                <div className="my-2">
                  <p className="text-sm font-regular text-dk-secondary dark:text-tertiary">
                    Cost for parking
                  </p>
                  <p className="text-md font-semibold text-dk-secondary dark:text-tertiary">
                    {connector.flatPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
