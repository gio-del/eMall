import Sheet from 'react-modal-sheet'
import './Drawer.css'
import type2 from './../assets/socketType2.svg'
import CCS2 from './../assets/socketTypeCCS2.svg'

export default function Drawer({ isOpen, setIsOpen }) {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="flex flex-col p-5">
            <div className="flex justify-between">
              <div>
                <p className="font-medium dark:text-tertiary text-dk-secondary">
                  Ionity
                </p>
                <p className="font-light  dark:text-tertiary text-dk-secondary">
                  Via Gran Sasso, 1, Milano
                </p>
              </div>
              <svg
                className="dark:fill-tertiary fill-dk-secondary"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                class="bi bi-three-dots-vertical"
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
              <div className="flex flex-row justify-start outline-none outline-tertiary rounded-2xl mb-4">
                <div className="flex items-center justify-center">
                  <img src={CCS2} className="p-1 h-12"></img>
                </div>
                <div className="p-1 flex flex-row justify-between w-full border-l-2 border-l-tertiary">
                  <div>
                    <p className="font-bold dark:text-tertiary text-dk-secondary mb-2">
                      CCS 2
                    </p>
                    <p className="font-medium dark:text-tertiary text-dk-secondary">
                      110 kW
                    </p>
                    <p className="font-medium dark:text-tertiary text-dk-secondary">
                      1,50$/h + 0,92$/kW
                    </p>
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className="p-4 w-full bg-dk-primary rounded-2xl text-center text-tertiary font-semibold">
                      NOW 1/1
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start outline-none outline-tertiary rounded-2xl mb-4">
                <div className="flex items-center justify-center">
                  <img src={type2} className="p-1 h-12"></img>
                </div>

                <div className="p-1 flex flex-row justify-between w-full border-l-2 border-l-tertiary">
                  <div>
                    <p className="font-bold dark:text-tertiary text-dk-secondary mb-2">
                      CCS 2
                    </p>
                    <p className="font-medium dark:text-tertiary text-dk-secondary">
                      110 kW
                    </p>
                    <p className="font-medium dark:text-tertiary text-dk-secondary">
                      1,50$/h + 0,92$/kW
                    </p>
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className="p-4 w-full bg-dk-primary rounded-2xl text-center text-tertiary font-semibold">
                      NOW 1/1
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
