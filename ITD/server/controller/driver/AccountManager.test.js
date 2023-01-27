const request = require('supertest') // npm --save-dev supertest
const app = require('../../index')
const queryManager = require('../QueryManager')
const smsAPI = require('../smsAPI')

jest.mock('../QueryManager', () => {
  return {
    getQueryManager: jest.fn().mockImplementation(() => {
      return {
        findDriverByPhoneNumber: jest.fn(),
        checkDriverVerificationCode: jest.fn(),
        deleteDriver: jest.fn(),
        createDriver: jest.fn(),
        createDriverVerificationCode: jest.fn()
      }
    })
  }
})

jest.mock('../smsAPI', () => {
  return {
    sendVerificationCode: jest.fn(),
  }
})


describe('/api/driver/user/signup', () => {
  let queryManagerInterface
  beforeEach(async () => {
    // Reset the mock functions before each test
    queryManagerInterface = await queryManager.getQueryManager()

    queryManagerInterface.findDriverByPhoneNumber.mockReset()
    queryManagerInterface.checkDriverVerificationCode.mockReset()
    queryManagerInterface.deleteDriver.mockReset()
    queryManagerInterface.createDriver.mockReset()
    queryManagerInterface.createDriverVerificationCode.mockReset()
    smsAPI.sendVerificationCode.mockReset()
  })

  it('should return 400 if phone number is invalid', async () => {
    const response = await request(app)
      .post('/api/driver/user/signup')
      .send({
        firstName: 'Mario',
        lastName: 'Rossi',
        password: 'Abc123!',
        phoneNumber: '1234a67890'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Phone number not valid')
  })


  it('should return 400 if password is invalid', async () => {
    const response = await request(app)
      .post('/api/driver/user/signup')
      .send({
        firstName: 'Giacomo',
        lastName: 'Verdi',
        password: 'password',
        phoneNumber: '1234567890'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Password must contain at least 8 character (at least one uppercase), at least 1 special symbol and at least 1 number')

  })

  it('should return 200 and send verification code if phone number is not registered', async () => {
    // Configure the mock query manager to return a null user
    queryManager.getQueryManager.mockImplementation(() => Promise.resolve({
      findDriverByPhoneNumber: jest.fn().mockResolvedValue(null),
      createDriver: jest.fn().mockResolvedValue(1),
      createDriverVerificationCode: jest.fn()
    }))

    // Configure the mock SMS API to send a verification code
    smsAPI.sendVerificationCode.mockImplementation(() => Promise.resolve())
    const response = await request(app)
      .post('/api/driver/user/signup')
      .send({
        firstName: 'Luca',
        lastName: 'Neri',
        password: 'Abc1234!',
        phoneNumber: '1234567890'
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('A verification code is sent via SMS')
    expect(response.body.id).toBe(1)

  })
})
