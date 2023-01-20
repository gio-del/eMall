import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_API } from '../constant'

export default function RegistrationView() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [id, setId] = useState(0)
  const [code, setCode] = useState()
  const [showVerification, setShowVerification] = useState(false)
  const [seconds, setSeconds] = useState(120)
  const [intervalId, setIntervalId] = useState()
  const navigate = useNavigate()

  const handleSubmitSignUp = async () => {
    console.log(phoneNumber)
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
        console.log(data.id)
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

  const handleSubmitCode = async () => {
    const response = await fetch(`${BASE_API}/driver/user/code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        driverID: id,
        code: parseInt(code),
      }),
    })
    if (response.status === 200) navigate('../login')
    else response.json((data) => setError(data.error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!showVerification) await handleSubmitSignUp()
    else await handleSubmitCode()
  }

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalId)
      setError('Too late, the code is expired. Register a new account!')
    }
  }, [seconds])

  return (
    <>
      {!showVerification && (
        <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium mb-4">Sign Up</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
            Sign Up
          </button>
        </form>
      )}
      {showVerification && (
        <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium mb-4">Account Verification</h2>
          <p>
            An SMS with a 6-digit code has been sent. Time remaining: {seconds}
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="text"
              pattern="[0-9]{6}"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}
      <p className="text-red-600">{error}</p>
    </>
  )
}
