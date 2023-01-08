import { useRouteError } from 'react-router-dom'
import NavBar from '../component/NavBar'

export default function ErrorView() {
  const error = useRouteError()
  console.error(error)

  return (
    <>
      <div>Something bad happened</div>
    </>
  )
}
