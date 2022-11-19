import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'

export default function RootLayout() {
  const [themeMode, setThemeMode] = useState('light')

  useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [themeMode])

  return (
    <>
      <NavBar onChangeThemeMode={setThemeMode} />
      <Outlet />
    </>
  )
}
