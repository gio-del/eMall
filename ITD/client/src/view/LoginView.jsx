import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_API } from '../constant'
import { useCookies } from 'react-cookie'

export default function LoginView() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [cookies, setCookie] = useCookies(['token'])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const response = await fetch(`${BASE_API}/driver/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      navigate('./../../map')
    } else response.json().then((data) => setError(data.error))
  }

  return (
    <>
      <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium mb-4">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            id="phoneNumber"
            type="tel"
            pattern="[0-9]{10}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
      <p className="text-red-600">{error}</p>
    </>
  )
}
