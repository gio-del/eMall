const queryManager = require('../QueryManager')
const { getReservations, getSlots, getMaxDuration, bookACharge } = require('./ReservationManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('Reservation Manager', () => {
    it('should return 401 if CPO has a wrong token', async () => {
        const queryManagerInterface = await queryManager.getQueryManager()
        await queryManagerInterface.executeAndCancel(async () => {
            const cpo = await fakeCPO(queryManagerInterface)
            const id = await queryManagerInterface.createDriver('Mario', 'Rossi', 'Password10!', '1234567890')
            const evcp = await queryManagerInterface.addEVCP(cpo.id, 'BestEVCPEver', '9.45', '45.6', 'Viale dei Pini')
            const token = await queryManagerInterface.createDriverToken(id)
            let req = {
                cookies: {
                }
            }
            let res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getReservations(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
            req = {
                query: {
                    type: 'Type2',
                    power: '22',
                    date: '2020-01-01'
                },
                params: {
                    id: evcp
                },
                cookies: {
                }
            }
            res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getSlots(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
            req = {
                query: {
                    type: 'Type2',
                    power: '22',
                    timeFrom: '2020-01-01'
                },
                params: {
                    id: evcp
                },
                cookies: {
                }
            }
            res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getMaxDuration(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
            req = {
                body: {
                    type: 'Type2',
                    power: '22',
                    timeFrom: new Date().toUTCString(),
                    timeTo: new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString()
                },
                params: {
                    id: evcp
                },
                cookies: {
                }
            }
            res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await bookACharge(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
        })
    })

    it('should return 200 if CPO has a correct token', async () => {
        const queryManagerInterface = await queryManager.getQueryManager()
        await queryManagerInterface.executeAndCancel(async () => {
            const cpo = await fakeCPO(queryManagerInterface)
            const id = await queryManagerInterface.createDriver('Mario', 'Rossi', 'Password10!', '1234567890')
            const evcp = await queryManagerInterface.addEVCP(cpo.id, 'BestEVCPEver', '9.45', '45.6', 'Viale dei Pini')
            const cp = await queryManagerInterface.addCP(evcp)
            const socket = await queryManagerInterface.addSocket(cp, 22, 'Type2')
            await queryManagerInterface.addRate(evcp, 'Type2', 10, 10)
            console.log('SOCKET: ' + socket)
            const token = await queryManagerInterface.createDriverToken(id)
            let req = {
                cookies: {
                    token: token
                }
            }
            let res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getReservations(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            req = {
                query: {
                    type: 'Type2',
                    power: '22',
                    date: '2020-01-01'
                },
                params: {
                    id: evcp
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
            await getSlots(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            req = {
                query: {
                    type: 'Type2',
                    power: '22',
                    timeFrom: '2020-01-01'
                },
                params: {
                    id: evcp
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
            await getMaxDuration(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            req = {
                body: {
                    type: 'Type2',
                    power: '22',
                    timeFrom: new Date().toISOString(),
                    timeTo: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()
                },
                params: {
                    id: evcp
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
            await bookACharge(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })
})