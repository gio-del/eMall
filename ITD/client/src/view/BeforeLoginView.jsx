import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../component/NavBar'
/**
 * This view should handle the token authentication, if there's a token redirect to the main content
 */
export default function BeforeLoginView() {
  const navigate = useNavigate()

  useEffect(() => {
    if (false) //this should be if (there is a token) so no reason to go to the landing page, and navigate to the main content
      navigate('/main')
  }, [])

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
