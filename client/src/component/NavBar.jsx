import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/lightLogo.png'
import DarkModeUtility from './utilitycomponent/DarkModeUtility'

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <nav className="sticky w-full top-0 inset-x-0 shadow-md dark:bg-dk-secondary bg-tertiary">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link className="font-bold text-2xl lg:text-4xl" to="/">
          <img className="h-auto w-auto max-w-14 max-h-14" src={logo}></img>
        </Link>
        <div className="inline-flex lg:hidden">
          <button
            className="flex items-center justify-center px-3 py-2 border rounded text-gray-500 dark:text-tertiary border-gray-600 dark:border-tertiary dark:hover:text-dk-primary dark:hover:border-dk-primary appearance-none focus:outline-none"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <svg
              className={isNavOpen ? 'hidden' : '' + ' fill-current h-4 w-4'}
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
            </svg>
            <svg
              className={!isNavOpen ? 'hidden' : '' + ' fill-current h-4 w-4'}
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Close</title>
              <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex">
            <li className="p-4 hover:text-gray-700 dark:text-dk-primary">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="p-4 hover:text-gray-700 dark:text-dk-primary">
              <Link to={'/login'}>Login</Link>
            </li>
            <li className="p-4 hover:text-gray-700 dark:text-dk-primary">
              <Link to={'/signup'}>Sign Up</Link>
            </li>
            <li className="px-4 flex">
              <DarkModeUtility />
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          !isNavOpen
            ? 'hidden'
            : '' +
              ' h-full flex flex-col items-center text-center lg:hidden dark:text-tertiary'
        }
      >
        <ul className="w-full">
          <li className="p-4 shadow-sm  hover:text-gray-700 dark:text-dk-primary">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="p-4 shadow-sm  hover:text-gray-700 dark:text-dk-primary">
            <Link to={'/login'}>Login</Link>
          </li>
          <li className="p-4 shadow-sm  hover:text-gray-700 dark:text-dk-primary">
            <Link to={'/signup'}>Sign Up</Link>
          </li>
          <li className="p-4 shadow-sm  hover:text-gray-700 dark:text-dk-primary">
            <DarkModeUtility />
          </li>
        </ul>
      </div>
    </nav>
  )
}
