const request = require('supertest') // npm --save-dev supertest
const router = require('./AccountManager')

describe('GET /myEndpoint', () => {
  it('should return 200 OK', async () => {
    const response = await request(router).get('/myEndpoint')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ some: 'response' })
  });
});

