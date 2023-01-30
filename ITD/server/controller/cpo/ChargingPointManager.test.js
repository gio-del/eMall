const queryManager = require('../QueryManager')
const { getAllEVCPs, getDetailsEVCP, addEVCP, addCP, addSocket } = require('./ChargingPointManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('Charging Points Manager', () => {
    describe('getAllEVCPs (CPO)', () => {
        it('should return 401 if CPO has a wrong token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { token } = await fakeCPO(queryManagerInterface)
                const req = {
                    cookies: {
                        token: 'abcd'
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getAllEVCPs(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 401 if CPO has not a token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { token } = await fakeCPO(queryManagerInterface)
                const req = {
                    cookies: {
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getAllEVCPs(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 200 if CPO has a correct token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const req = {
                    cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getAllEVCPs(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
                expect(res.status().json).toHaveBeenCalledWith([{ evcpID: evcpID, name: 'ProvaEVCP' }])
            })
        })
    })
    describe('getDetailsEVCP (CPO)', () => {
        it('should return 401 if CPO has an invalid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const req = {
                    params: {
                        evcpID: evcpID
                    },
                    cookies: {
                        token: 'abcd'
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getDetailsEVCP(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 200 if CPO has a valid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const req = {
                    params: {
                        evcpID: evcpID
                    },
                    cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getDetailsEVCP(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
            })
        })
    })
    describe('add EVCP', () => {
        it('should return 401 if CPO has an invalid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const req = {
                    body: {
                        name: 'ProvaEVCP',
                        latitude: '9.1289',
                        longitude: '45.1234',
                        address: 'Via Prova 1'
                    },
                    cookies: {
                        token: 'abcd'
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addEVCP(req, res)
                const evcps = await queryManagerInterface.getEVCPsByCPO(id)

                expect(evcps.length).toBe(0)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 200 if CPO has a valid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const req = {
                    body: {
                        name: 'ProvaEVCP',
                        latitude: '9.1289',
                        longitude: '45.1234',
                        address: 'Via Prova 1'
                    },
                    cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addEVCP(req, res)
                const evcps = await queryManagerInterface.getEVCPsByCPO(id)

                expect(evcps.length).toBe(1)
                expect(res.status).toHaveBeenCalledWith(200)
            })
        })
    })
    describe('add CP', () => {
        it('should return 401 if CPO has an invalid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const req = {
                    params: {
                        evcpID: 1
                    },
                    cookies: {
                        token: 'abcd'
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addCP(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })
        it('should return 401 if CPO is adding to an EVCP of other CPOs', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)

                const req = {
                    params: {
                        evcpID: 0
                    },
                    cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addCP(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 200 if CPO has a valid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const req = {
                    params: {
                        evcpID: evcpID
                    },
                    cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addCP(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
            })
        })
    })
    describe('add Socket', () => {
        it('should return 401 if CPO has an invalid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const cpID = await queryManagerInterface.addCP(evcpID)
                const req = {
                    params: {
                        cpID: cpID
                    },
                    body: {
                        power: 100,
                        type: 'Type2'
                    },
                    cookies: {
                        token: 'abcd'
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addSocket(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })
        it('should return 200 if CPO has a valid token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const cpID = await queryManagerInterface.addCP(evcpID)
                const req = {
                    params: {
                        cpID: cpID
                    },
                    body: {
                        power: 100,
                        type: "Type2"
                    },
                    cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addSocket(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
            })
        })
    })
})
