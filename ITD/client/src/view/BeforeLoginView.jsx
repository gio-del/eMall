import { useRoutes } from 'react-router-dom'
import NavBar from '../component/NavBar'
import LoginView from './LoginView'
import RegistrationView from './RegistrationView'
import WelcomeView from './WelcomeView'
/**
 * This view should handle the token authentication, if there's a token redirect to the main content
 */
export default function BeforeLoginView() {
  const activeRoutes = useRoutes([
    {
      path: '/',
      element: <WelcomeView />,
    },
    {
      path: '/login/',
      element: <LoginView />,
    },
    {
      path: '/signup',
      element: <RegistrationView />,
    },
  ])

  return (
    <>
      <NavBar />
      {activeRoutes}
    </>
  )
}
