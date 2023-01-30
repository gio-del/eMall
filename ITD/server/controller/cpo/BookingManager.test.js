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
        it('should return 200 if EVCP is associated to the CPO', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const req = {
                    body: {
                        email: 'abcdfghilmnopqrstuvz',
                        password: 'Password10!'
                    }, cookies: {
                        token: token
                    }
                }
                const res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await login(req, res)
                expect(res.status).toHaveBeenCalledWith(400)
            })
        })
    })
})
