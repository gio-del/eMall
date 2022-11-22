import type2 from './../../assets/socketType2.svg'
import CCS2 from './../../assets/socketTypeCCS2.svg'

export default function DrawerContent({ CPOName, Address, Connectors }) {
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
        <svg
          className="dark:fill-tertiary fill-dk-secondary bi bi-three-dots-vertical"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{' '}
        </svg>
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
          <div className="flex flex-row justify-start border-2 border-dk-secondary dark:border-tertiary rounded-2xl mb-4">
            <div className="flex items-center justify-center">
              <img src={CCS2} className="p-1 h-12"></img>
            </div>
            <div className="p-1 flex flex-row justify-between w-full border-l-2 dark:border-l-tertiary border-l-dk-secondary">
              <div>
                <p className="text-lg font-bold dark:text-tertiary text-dk-secondary mt-1 mb-1 mx-1">
                  {connector.type}
                </p>
                <p className="font-medium dark:text-tertiary text-dk-secondary mx-1">
                  {connector.power}
                </p>
                <p className="font-light dark:text-tertiary text-dk-secondary mx-1 mb-1">
                  {connector.price}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button className="p-4 w-full mx-4 bg-dk-primary rounded-2xl text-center text-tertiary font-semibold">
                  NOW {connector.availableSockets}/{connector.totalSockets}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
