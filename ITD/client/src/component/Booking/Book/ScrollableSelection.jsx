import { useState, useRef } from 'react'
import './ScrollableSelection.css'

export default function ScrollableSelection({ children }) {
  const scrollTimerRef = useRef()
  const scrollVelocity = 150

  const onWheel = (e) => {
    const container = scrollRef.current
    const containerScrollPosition = scrollRef.current.scrollLeft

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    })
  }

  const scrollRef = useRef(null)

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset
  }

  return (
    <>
      <div className="flex-row w-full">
        <div className="flex items-center">
          <button
            className="max-sm:hidden"
            onClick={() => scroll(-60)}
            onMouseDown={() => {
              scrollTimerRef.current = window.setInterval(
                () => scroll(-60),
                scrollVelocity,
              )
            }}
            onMouseUp={() => clearInterval(scrollTimerRef.current)}
          >
            <div className="border-2 dark:border-tertiary border-dk-secondary py-2 mr-1 rounded-lg shadow-md hover:bg-dk-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                className="fill-dk-secondary dark:fill-tertiary hover:fill-tertiary"
                viewBox="3 5 40 40"
              >
                <path d="M28.1 36.45 15.55 23.9 28.1 11.35l2.6 2.6-9.95 9.95 9.95 9.95Z" />
              </svg>
            </div>
          </button>

          <div
            className="container-scroll overflow-x-scroll overflow-y-hidden flex my-2 mr-2 py-3"
            id="container"
            ref={scrollRef}
            onWheel={onWheel}
          >
            {children}
          </div>

          <button
            className="max-sm:hidden"
            onClick={() => scroll(60)}
            onMouseDown={() => {
              scrollTimerRef.current = window.setInterval(
                () => scroll(60),
                scrollVelocity,
              )
            }}
            onMouseUp={() => clearInterval(scrollTimerRef.current)}
          >
            <div className="border-2 dark:border-tertiary border-dk-secondary py-2 mr-1 rounded-lg shadow-md hover:bg-dk-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                className="fill-dk-secondary dark:fill-tertiary hover:fill-tertiary"
                viewBox="0 5 40 40"
              >
                <path d="m18.75 36.45-2.6-2.6 9.95-9.95-9.95-9.95 2.6-2.6L31.3 23.9Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
