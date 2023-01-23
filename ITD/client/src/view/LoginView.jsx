import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_API } from '../constant'
import FormField from '../component/utilitycomponent/FormField'
import RadioButton from '../component/utilitycomponent/RadioButton'

export default function LoginView() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [role, setRole] = useState('Driver')
  const navigate = useNavigate()

  const handleCPOSubmit = async () => {
    const response = await fetch(`${BASE_API}/cpo/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    if (response.status === 200) {
      console.log(response.headers)
      navigate('./../../cpo')
    } else response.json().then((data) => setError(data.error))
  }

  const handleDriverSubmit = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (role === 'Driver') await handleDriverSubmit()
    else if (role === 'CPO') await handleCPOSubmit()
  }

  return (
    <>
      <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium mb-4">Login</h2>
        <p>Select a Role</p>
        <div className="flex flex-row gap-10">
          <RadioButton role={role} name="Driver" setRole={setRole} />
          <RadioButton role={role} name="CPO" setRole={setRole} />
        </div>
        {role === 'Driver' && (
          <FormField
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            pattern="[0-9]{10}"
            onChange={(e) => setPhoneNumber(e.target.value)}
          >
            Phone Number
          </FormField>
        )}
        {role === 'CPO' && (
          <FormField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </FormField>
        )}
        {(role === 'CPO' || role === 'Driver') && (
          <>
            <FormField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </FormField>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </>
        )}
      </form>
      <p className="text-red-600">{error}</p>
    </>
  )
}
