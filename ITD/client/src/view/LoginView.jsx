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

  // the form is responsive and will change based on the role selected by the user (Driver or CPO) and will display the appropriate fields. we use tailwindcss to style the form and the radio buttons. the form will be displayed in the center of the screen and will be responsive to the screen size. the form will be displayed in a card like container with a shadow effect. the form will have a submit button that will call the handleSubmit function. the handleSubmit function will call the appropriate function based on the role selected by the user. the appropriate function will call the appropriate API endpoint and will redirect the user to the appropriate page if the login is successful. if the login is unsuccessful, the error message will be displayed on the form.
  return (
    <div className="flex justify-center h-screen lg:items-center">
      <div className="w-full max-w-lg">
        <form
          className="bg-white drop-shadow-xl rounded-xl shadow-2xl outline-none outline-offset-0 outline-tertiary outline-2  px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row mb-4 gap-10">
            <RadioButton
              name="Driver" // name of the radio button
              role={role}
              setRole={setRole}
            >
              Driver
            </RadioButton>
            <RadioButton name="CPO" role={role} setRole={setRole}>
              CPO
            </RadioButton>
          </div>
          {role === 'Driver' ? (
            <FormField
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              pattern="[0-9]{10}"
              onChange={(e) => setPhoneNumber(e.target.value)}
            >
              Phone Number
            </FormField>
          ) : (
            <FormField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              Email
            </FormField>
          )}
          <FormField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </FormField>
          <div className="flex items-center justify-between">
            <button className="bg-dk-primary text-dk-secondary py-2 px-4 rounded-lg hover:shadow-md">
              Login
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}!</p>}
        </form>
      </div>
    </div>
  )
}
