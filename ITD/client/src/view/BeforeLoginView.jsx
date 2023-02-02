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
      {/* footer using tailwind */}
      <div className="py-10 bg-tertiary dark:bg-dk-secondary text-center text-sm text-dk-secondary dark:text-tertiary">
        <p className="text-xs">
          <a
            href="https://github.com/gio-del"
            className="text-dk-secondary dark:text-tertiary hover:text-searchInput dark:hover:text-tertiary p-1 m-2 rounded-2xl dark:bg-dk-primary"
          >
            Giovanni De Lucia
          </a>
          <a
            href="https://github.com/lorenzo-battiston"
            className="text-dk-secondary dark:text-tertiary hover:text-searchInput dark:hover:text-tertiary p-1 m-2 rounded-2xl dark:bg-dk-primary"
          >
            Lorenzo Battiston
          </a>
          <a
            href="https://github.com/mattecurro"
            className="text-dk-secondary dark:text-tertiary hover:text-searchInput dark:hover:text-tertiary p-1 m-2 rounded-2xl dark:bg-dk-primary"
          >
            Matteo Salvatore Currò
          </a>
        </p>
      </div>
    </>
  )
}
