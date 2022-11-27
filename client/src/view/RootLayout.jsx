import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'

export default function RootLayout() {
  useEffect(() => {
    const handleThemeChanges = () => {
      if (
        window.localStorage.getItem('theme') === 'dark' ||
        (!('theme' in window.localStorage) &&
          window.window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    handleThemeChanges()
    window.addEventListener('storage', handleThemeChanges)
    return () => {
      window.removeEventListener('storage', handleThemeChanges)
    }
  }, [])

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
