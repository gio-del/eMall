const queryManager = require('../QueryManager')
const { getReservations, getAggregatedReservations } = require('./BookingManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('BookingManager', () => {
    describe('getReservations (CPO)', () => {
        it('should return 401 if EVCP is not associated to the CPO', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const req = {
                    params: {
                        evcpID: 0
                    }, cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getReservations(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 200 if EVCP is associated to the CPO', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                const req = {
                    params: {
                        evcpID: evcpID
                    }, cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getReservations(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
            })
        })
    })
    describe('getAggregatedReservations (CPO)', () => {
        it('should return 401 if CPO has an invalid token', async () => {
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
                await getAggregatedReservations(req, res)
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
                await getAggregatedReservations(req, res)
                expect(res.status).toHaveBeenCalledWith(401)
            })
        })

        it('should return 200 if EVCP is associated to the CPO', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { token } = await fakeCPO(queryManagerInterface)
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
                await getAggregatedReservations(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
            })
        })
    })
})
