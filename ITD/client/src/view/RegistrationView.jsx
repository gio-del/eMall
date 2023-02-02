import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../component/utilitycomponent/FormField'
import RadioButton from '../component/utilitycomponent/RadioButton'
import { BASE_API } from '../constant'

export default function RegistrationView() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [id, setId] = useState(0)
  const [code, setCode] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const [seconds, setSeconds] = useState(120)
  const [intervalId, setIntervalId] = useState()
  const [role, setRole] = useState('Driver')

  const navigate = useNavigate()

  const handleSubmitDriverSignUp = async () => {
    const response = await fetch(`${BASE_API}/driver/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: password,
      }),
    })

    if (response.status === 200) {
      response.json().then((data) => {
        setId(data.id)
        setIntervalId(
          setInterval(() => {
            setSeconds((seconds) => seconds - 1)
          }, 1000),
        )
        setShowVerification(true)
      })
    } else response.json().then((data) => setError(data.error))
  }

  const handleSubmitCPOSignUp = async () => {
    const response = await fetch(`${BASE_API}/cpo/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: companyName,
        email: email,
        password: password,
      }),
    })

    if (response.status === 200) {
      response.json().then((data) => {
        setId(data.id)
        setIntervalId(
          setInterval(() => {
            setSeconds((seconds) => seconds - 1)
          }, 1000),
        )
        setShowVerification(true)
      })
    } else response.json().then((data) => setError(data.error))
  }

  const handleSubmitDriverCode = async () => {
    const response = await fetch(`${BASE_API}/driver/user/code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        driverID: id,
        code: parseInt(code),
      }),
    })
    if (response.status === 200) navigate('../login')
    else response.json().then((data) => setError(data.error))
  }

  const handleSubmitCPOCode = async () => {
    const response = await fetch(`${BASE_API}/cpo/user/code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cpoID: id,
        code: parseInt(code),
      }),
    })
    if (response.status === 200) navigate('../login')
    else response.json().then((data) => setError(data.error))
  }

  const handleDriverSubmit = async () => {
    if (!showVerification) await handleSubmitDriverSignUp()
    else await handleSubmitDriverCode()
  }

  const handleCPOSubmit = async () => {
    if (!showVerification) await handleSubmitCPOSignUp()
    else await handleSubmitCPOCode()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (role === 'Driver') await handleDriverSubmit()
    else if (role === 'CPO') await handleCPOSubmit()
  }

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalId)
      setError('Too late, the code is expired. Register a new account!')
    }
  }, [seconds])

  return (
    <div className="flex justify-center h-screen lg:items-center">
      <div className="w-full max-w-lg">
        {!showVerification && (
          <form
            className="bg-white drop-shadow-xl rounded-xl shadow-2xl outline-none outline-offset-0 outline-tertiary outline-2  px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-medium mb-4">Sign Up</h2>
            <p>Select a Role</p>
            <div className="flex flex-row gap-10">
              <RadioButton role={role} name="Driver" setRole={setRole} />
              <RadioButton role={role} name="CPO" setRole={setRole} />
            </div>
            {role === 'Driver' && (
              <>
                <FormField
                  id="firstName"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                >
                  First Name
                </FormField>
                <FormField
                  id="lastName"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                >
                  Last Name
                </FormField>
                <FormField
                  id="phoneNumber"
                  type="tel"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  pattern="[0-9]{10}"
                  value={phoneNumber}
                >
                  Phone Number
                </FormField>
              </>
            )}
            {role === 'CPO' && (
              <>
                <FormField
                  id="companyName"
                  type="text"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                >
                  Company Name
                </FormField>
                <FormField
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                >
                  Email
                </FormField>
              </>
            )}
            {(role === 'Driver' || role === 'CPO') && (
              <>
                <FormField
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                >
                  Password
                </FormField>
                <button className="bg-dk-primary text-dk-secondary py-2 px-4 rounded-lg hover:shadow-md">
                  Sign Up
                </button>
              </>
            )}
          </form>
        )}
        {showVerification && (
          <form
            className="bg-white drop-shadow-xl rounded-xl shadow-2xl outline-none outline-offset-0 outline-tertiary outline-2  px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-medium mb-4">Account Verification</h2>
            <p>
              {`${
                role === 'Driver' ? 'An SMS' : 'A mail'
              } with a 6-digit code has been sent. Time remaining: ${seconds}`}
            </p>
            <FormField
              id="code"
              type="text"
              onChange={(e) => setCode(e.target.value)}
              pattern="[0-9]{6}"
              placeholder="Enter 6-digit code"
              value={code}
            >
              Code
            </FormField>
            <button className="bg-dk-primary text-dk-secondary py-2 px-4 rounded-lg hover:shadow-md">
              Submit
            </button>
          </form>
        )}
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  )
}
