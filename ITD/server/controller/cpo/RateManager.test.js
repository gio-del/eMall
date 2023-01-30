const queryManager = require('../QueryManager')
const { addRate, getRates } = require('./RateManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('Rate Manager', () => {
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
                    typeName: 'Type2',
                    flatPrice: 0.5,
                    variablePrice: 0.5
                },
                cookies: {
                }
            }
            const res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getRates(req, res)
            expect(res.status).toHaveBeenCalledWith(401)
            await addRate(req, res)
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
                body: {
                    typeName: 'Type2',
                    flatPrice: 0.5,
                    variablePrice: 0.5
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
            await addRate(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            // get the value of res.status().json
            const rate = res.status().json.mock.calls[0][0]

            await getRates(req, res)
            expect(res.status).toHaveBeenCalledWith(200)

            // check that the rate 'rate' is in the list of rates by checking the id of the rate
            const rates = res.status().json.mock.calls[0][0]
            expect(rates.id).toEqual(rate.id)
        })
    })
})