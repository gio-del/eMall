import details from '../assets/details.png'
import booking from '../assets/book.png'
import { useEffect, useRef } from 'react'

export default function WelcomeView() {
  const deferredInstallRef = useRef()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      deferredInstallRef.current = e
    })
  }, [])

  const onInstallClick = async () => {
    if (deferredInstallRef !== null) {
      deferredInstallRef.current.prompt()
      const { outcome } = await deferredInstallRef.current.userChoice
      if (outcome === 'accepted') {
        deferredInstallRef.current = null
      }
    }
  }

  return (
    <div className="py-10 dark:bg-dk-secondary bg-dk-primary">
      <h2 className="px-6 text-3xl lg:text-5xl font-bold mb-2 text-white">
        Electric Mobility For All!
      </h2>
      <section className="container mx-auto px-6 flex items-center justify-between h-[calc(100vh-4.5rem)]">
        <div className="w-full md:w-1/2">
          <h3 className="text-xl sm:text-3xl mb-8 text-dk-secondary dark:text-tertiary">
            Make your charging processes easy, non plan-ruiner and fun
          </h3>
          <button
            className="bg-white hover:outline-dk-secondary dark:hover:outline-dk-primary outline-none outline-2 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
            onClick={onInstallClick}
          >
            Discover now
          </button>
        </div>
        <div className="flex justify-center w-full md:w-1/2">
          <img src={details} style={{ maxHeight: '100vh' }}></img>
        </div>
      </section>
      <section className="container mx-auto px-6 flex items-center justify-between h-[calc(100vh-4.5rem)]">
        <div className="flex justify-center w-full md:w-1/2">
          <img src={booking} style={{ maxHeight: '100vh' }}></img>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl sm:text-3xl mb-8 text-dk-secondary dark:text-tertiary">
            Book your next charge with zero stress
          </h3>
          <button className="bg-white hover:outline-dk-primary outline-none outline-4 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
            Discover now
          </button>
        </div>
      </section>
    </div>
  )
}
