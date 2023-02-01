const queryManager = require('../queryManager')
const { signup, login, verifyCode, logout, authenticate } = require('./AccountManager')
const MockDate = require('mockdate')

jest.setTimeout(50000)

describe('AccountManager', () => {
  // test login(req,res) method and mock res to catch the status returned
  describe('login', () => {
    it('should return 400 if phone number is not valid', async () => {
      const req = {
        body: {
          phoneNumber: '123456789',
          password: '123456'
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await login(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
      })
    })

    it('should return 401 if phone number or password are wrong', async () => {
      const req = {
        body: {
          phoneNumber: '1234567890',
          password: '123456'
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await login(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
      })
    })
    it('should return 200 if phone number and password are correct', async () => {
      const req = {
        body: {
          phoneNumber: '1234567890',
          password: 'Password17!'
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          cookie: jest.fn().mockReturnValue({
            json: jest.fn()
          })
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {

        await queryManagerInterface.createDriver('Mario', 'Rossi', 'Password17!', '1234567890')

        await login(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
      })

    })
  })

  describe('signup', () => {
    it('should return 400 if phone number is not valid', async () => {
      const req = {
        body: {
          firstName: 'Mario',
          lastName: 'Rossi',
          phoneNumber: '123456789',
          password: 'Password17!'
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
      }
      )
    })

    it('should return 400 if password is not valid', async () => {
      const req = {
        body: {
          firstName: 'Mario',
          lastName: 'Rossi',
          phoneNumber: '1234567890',
          password: 'stupidpassword'
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
      }
      )
    })

    it('should return 200 if phone number and password are correct', async () => {
      const req = {
        body: {
          firstName: 'Mario',
          lastName: 'Rossi',
          phoneNumber: '1234567890',
          password: 'Password17!'
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
      }
      )
    })
  })
  describe('code', () => {
    it('should return 400 if code is not valid', async () => {
      const req = {
        body: {
          driverID: 1,
          code: 12345
        }
      }
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await verifyCode(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
      }
      )
    })

    it('should return 200 if code is valid', async () => {
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        const driverID = await queryManagerInterface.createDriver('Mario', 'Rossi', 'Password17!', '1234567890')
        const req = {
          body: {
            driverID: driverID,
            code: 123456
          }
        }

        await queryManagerInterface.createDriverVerificationCode(driverID, '123456')

        MockDate.set(new Date(new Date().getTime() - 24 * 60 * 60 * 1000))
        await verifyCode(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
      }
      )
    })

    it('should return 410 if code is valid but expired', async () => {
      const res = {
        status: jest.fn().mockReturnValue({
          json: jest.fn()
        })
      }
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        const driverID = await queryManagerInterface.createDriver('Mario', 'Rossi', 'Password17!', '1234567890')
        const req = {
          body: {
            driverID: driverID,
            code: 123456
          }
        }

        await queryManagerInterface.createDriverVerificationCode(driverID, '123456')

        MockDate.set(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
        await verifyCode(req, res)

        expect(res.status).toHaveBeenCalledWith(410)
      }
      )
    })
  })
  describe('logout', () => {
    it('should return 200', async () => {
      const queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        await queryManagerInterface.createDriver('Mario', 'Rossi', 'Password17!', '1234567890')
        let req = {
          body: {
            phoneNumber: '1234567890',
            password: 'Password17!'
          }
        }
        let res = {
          status: jest.fn().mockReturnValue({
            cookie: jest.fn().mockReturnValue({
              json: jest.fn()
            })
          })
        }
        await login(req, res)
        // get the cookie
        const cookie = res.status().cookie.mock.calls[0][1]

        // now logout
        req = {
          cookies: {
            'token': cookie
          }
        }
        res = {
          status: jest.fn().mockReturnValue({
            clearCookie: jest.fn().mockReturnValue({
              json: jest.fn()
            })
          })
        }
        await logout(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        const id = await authenticate(cookie)
        expect(id).toBeUndefined()
      }
      )
    })
    it('should return 400', async () => {
      queryManagerInterface = await queryManager.getQueryManager()
      await queryManagerInterface.executeAndCancel(async () => {
        req = {
          cookies: {
          }
        }
        res = {
          status: jest.fn().mockReturnValue({
            json: jest.fn()
          })
        }
        await logout(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
      })
    })
  })
})
