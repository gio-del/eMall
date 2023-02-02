import details from '../assets/landing/details.png'
import booking from '../assets/landing/book.png'
import map from '../assets/landing/map.png'
import style from './WelcomeView.css'
import { useEffect } from 'react'

export default function WelcomeView() {
  function onIntersection(entries) {
    console.log(entries)
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-5px',
      threshold: 0.7,
    }

    const observer = new IntersectionObserver(onIntersection, options)

    const elements = [
      ...document.querySelectorAll('.landing-images-from-right'),
      ...document.querySelectorAll('.landing-images-from-left'),
    ]
    elements.forEach((element) => {
      observer.observe(element)
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="py-10 dark:bg-dk-secondary bg-dk-primary">
      <h1 className="text-5xl font-bold text-center text-dk-secondary dark:text-dk-primary">
        Welcome to eMall!
      </h1>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-col items-center justify-center w-full lg:w-2/3 h-full">
          <h2 className="text-3xl font-bold text-center text-dk-secondary dark:text-dk-primary">
            What is eMall?
          </h2>
          <section className="mt-6 landing-images-from-right container mx-auto px-6 flex flex-col items-center lg:h-[calc(100vh-5rem)] bg-dk-primary dark:bg-dk-secondary">
            <p className="p-8 text-center text-dk-secondary dark:text-dk-primary text-lg">
              eMall is a web application that allows users to search for
              charging points
            </p>
            <img
              className="rounded-2xl outline-none outline-offset-0 outline-tertiary dark:outline-dk-nav"
              src={map}
              alt="map"
            />
          </section>

          <section className="mt-6 landing-images-from-left container mx-auto px-6 flex flex-col items-center lg:h-[calc(100vh-5rem)] bg-dk-primary dark:bg-dk-secondary">
            <img
              className="rounded-2xl outline-none outline-offset-0 outline-tertiary dark:outline-dk-nav"
              src={details}
              alt="details"
            />
          </section>

          <section className="mt-6 landing-images-from-right container mx-auto px-6 flex flex-col items-center lg:h-[calc(100vh+16rem)] bg-dk-primary dark:bg-dk-secondary">
            <p className="p-8 text-center text-dk-secondary dark:text-dk-primary text-lg">
              eMall is a web application that allows users to book a charging
              point
            </p>
            <img
              className="rounded-2xl outline-none outline-offset-0 outline-tertiary dark:outline-dk-nav"
              src={booking}
              alt="booking"
            />
          </section>
        </div>
      </div>
    </div>
  )
}
