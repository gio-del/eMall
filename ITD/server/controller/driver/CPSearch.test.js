const queryManager = require('../QueryManager')
const { getEVCPs, getDetailsEVCP } = require('./CPSearch')

const MockDate = require('mockdate')

jest.setTimeout(50000)

const fakeCPO = async (queryManagerInterface) => {
    const id = await queryManagerInterface.createCPO('BestCPO', 'Password10!', 'email@email.xyz')
    return { id: id, token: await queryManagerInterface.createCPOToken(id) }
}

describe('Charging Point Search', () => {
    it('should return 200 if driver has a correct token', async () => {
        const queryManagerInterface = await queryManager.getQueryManager()
        await queryManagerInterface.executeAndCancel(async () => {
            const { id } = await fakeCPO(queryManagerInterface)
            const evcpID1 = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1289', '45.1234', 'Via Prova, 1')
            const evcpID2 = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1281', '45.1232', 'Via Prova, 2')
            const evcpID3 = await queryManagerInterface.addEVCP(id, 'ProvaEVCP', '9.1281', '45.1237', 'Via Prova, 3')
            let req = {
                query: {
                    latitude: '9.1289',
                    longitude: '45.1234',
                }
            }
            const res = {
                status: jest.fn().mockReturnValue({
                    json: jest.fn()
                })
            }
            await getEVCPs(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            // check that the three evcp are part of the response, maybe with a contains
            expect(res.status().json).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ evcpID: evcpID1 }),
                expect.objectContaining({ evcpID: evcpID2 }),
                expect.objectContaining({ evcpID: evcpID3 })
            ]))

            req = {
                params: {
                    id: evcpID1
                }
            }
            await getDetailsEVCP(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ evcpID: evcpID1 }))
        })
    })

})