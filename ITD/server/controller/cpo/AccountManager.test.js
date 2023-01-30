const queryManager = require('../queryManager')
const { signup, login, verifyCode } = require('./AccountManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

describe('AccountManager', () => {
    // test login(req,res) method and mock res to catch the status returned
    describe('login', () => {
        it('should return 400 if email is not valid', async () => {
            const req = {
                body: {
                    email: 'abcdfghilmnopqrstuvz',
                    password: 'Password10!'
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

        it('should return 401 if email or password are wrong', async () => {
            const req = {
                body: {
                    email: 'email@email.xyz',
                    password: 'Password10!'
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
        it('should return 200 if email and password are correct', async () => {
            const req = {
                body: {
                    email: 'email@email.xyz',
                    password: 'Password10!'
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

                await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')

                await login(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
            })

        })
    })

    describe('signup', () => {
        it('should return 400 if email is not valid', async () => {
            const req = {
                body: {
                    companyName: 'BestCPO',
                    email: 'provaprova.it',
                    password: 'Password10!'
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
                    companyName: 'BestCPO',
                    email: 'email@email.xyz',
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

        it('should return 200 if email and password are correct', async () => {
            const req = {
                body: {
                    companyName: 'BestCPO',
                    email: 'email@email.xyz',
                    password: 'Password10!'
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
                    cpoID: 1,
                    code: '12345'
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
                const cpoID = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
                const req = {
                    body: {
                        cpoID: cpoID,
                        code: 123456
                    }
                }
                console.log(cpoID, req.body)
                await queryManagerInterface.createCPOVerificationCode(cpoID, '123456')

                MockDate.set(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) // yesterday, the code is OK
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
                const cpoID = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
                const req = {
                    body: {
                        cpoID: cpoID,
                        code: 123456
                    }
                }

                await queryManagerInterface.createCPOVerificationCode(cpoID, '123456')

                MockDate.set(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)) // tomorrow, the code is GONE
                await verifyCode(req, res)

                expect(res.status).toHaveBeenCalledWith(410)
            }
            )
        })
    })
})
