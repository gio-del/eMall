const queryManager = require('../QueryManager')
const { addRate, getRates, addSpecialOffer, getSpecialOffer, deleteSpecialOffer } = require('./RateManager')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('Rate Manager', () => {
    describe('Rates', () => {
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

    describe('Special Offers', () => {
        it('should return 401 if CPO has not a token', async () => {
            const queryManagerInterface = await queryManager.getQueryManager()
            await queryManagerInterface.executeAndCancel(async () => {
                const { id, token } = await fakeCPO(queryManagerInterface)
                const evcpID = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova 1')
                let req = {
                    params: {
                        evcpID: evcpID
                    },
                    cookies: {
                    }
                }
                let res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await getSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(401)

                req = {
                    params: {
                        evcpID: evcpID
                    },
                    body: {
                        discount: 10,
                    },
                    cookies: {
                    }
                }
                res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await addSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(401)


                req = {
                    params: {
                        evcpID: evcpID
                    },
                    body: {
                        specialOfferID: 10,
                    },
                    cookies: {
                    }
                }
                res = {
                    status: jest.fn().mockReturnValue({
                        json: jest.fn()
                    })
                }
                await deleteSpecialOffer(req, res)
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
                await getSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(200)

                const specialOffer1 = res.status().json.mock.calls[0][0]
                expect(specialOffer1).toBe(undefined)

                req = {
                    params: {
                        evcpID: evcpID
                    },
                    body: {
                        discount: 10,
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
                await addSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(200)


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
                await getSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
                const specialOffer2 = res.status().json.mock.calls[0][0]
                expect(specialOffer2.discount).toEqual(10)

                const specialOfferID = specialOffer2.specialOfferID

                req = {
                    params: {
                        evcpID: evcpID
                    },
                    body: {
                        specialOfferID: specialOfferID,
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
                await deleteSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(200)

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

                await getSpecialOffer(req, res)
                expect(res.status).toHaveBeenCalledWith(200)
                const specialOffer3 = res.status().json.mock.calls[0][0]
                expect(specialOffer3).toBe(undefined)
            })
        })
    })
})