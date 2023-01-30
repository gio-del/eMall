const queryManager = require('../QueryManager')
const { getDSO, getDSOAvailability, changeDSO } = require('./EnergyManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('Energy Manager', () => {
    it('should return 401 if CPO has not a token', async () => {
        const queryManagerInterface = await queryManager.getQueryManager()
        await queryManagerInterface.executeAndCancel(async () => {
            const { id, token } = await fakeCPO(queryManagerInterface)
            const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
            const req = {
                params: {
                    evcpID: evcpID
                },
                body: {
                    dsoID: '0'
                },
                cookies: {
                }
            }
            const res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getDSO(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
            await getDSOAvailability(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
            await changeDSO(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
        })
    })
    it('should return 200 if CPO has a valid token', async () => {
        const queryManagerInterface = await queryManager.getQueryManager()
        await queryManagerInterface.executeAndCancel(async () => {
            const { id, token } = await fakeCPO(queryManagerInterface)
            const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
            let req = {
                params: {
                    evcpID: evcpID
                },
                cookies: {
                    token: token
                }
            }
            let res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getDSOAvailability(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            // get the value of res.status().json
            const dso = res.status().json.mock.calls[0][0][0]
            req = {
                params: {
                    evcpID: evcpID
                },
                body: {
                    dsoID: dso.dsoID
                },
                cookies: {
                    token: token
                }
            }
            res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await changeDSO(req, res)
            expect(res.status).toHaveBeenCalledWith(200)

            // new req and res
            req = {
                params: {
                    evcpID: evcpID
                },
                cookies: {
                    token: token
                }
            }
            res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            // now check if the DSO has been changed
            await getDSO(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            // get the value of res.status().json
            const newDSO = res.status().json.mock.calls[0][0]
            expect(newDSO.DSOname).toEqual(dso.DSOname)
        })
    })
})