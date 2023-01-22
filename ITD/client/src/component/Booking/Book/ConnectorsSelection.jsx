import ConnectorSVG from '../../utilitycomponent/ConnectorSVG'
import RadioComponent from './RadioComponent'

export default function ConnectorsSelection({
  connectors,
  setTypeName,
  setPower,
}) {
  return (
    <div className="flex flex-row justify-around mt-7">
      {connectors.map((connector) => (
        <div key={connector.socketID}>
          <RadioComponent
            id={`connector-${connector.typeName + connector.power}`}
            onChange={() => {
              setTypeName(connector.typeName)
              setPower(connector.power)
            }}
          >
            <label
              htmlFor={`connector-${connector.typeName + connector.power}`}
              className="flex flex-row justify-start items-center pr-10 rounded-2xl cursor-pointer dark:text-tertiary text-dk-secondary border-2 dark:border-tertiary border-dk-secondary"
            >
              <ConnectorSVG type={connector.typeName} />
              <div className="border-l-2 dark:border-tertiary border-dk-secondary flex  h-full p-3">
                <div>
                  <p className="font-semibold">{connector.typeName}</p>
                  <p className="font-light text-sm">{connector.power}KW</p>
                </div>
              </div>
            </label>
          </RadioComponent>
        </div>
      ))}
    </div>
  )
}
