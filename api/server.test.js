const authRouter = require('../api/auth/auth-router');
const request = require('supertest');
const db = require('../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('users').truncate()
})
afterAll(async() => {
    await db.destroy();
})
it('works for sanity', () => {
  expect(true).toBe(true);
})
describe('Auth/Users Endpoints', () => {
    describe('[GET] /api/auth/register', () => {
        it('returns all the users', async () => {
            const res = await request(authRouter).get('/register')
            console.log(res);
            expect(res.body).toHaveLength(2);
        })
        it('responds with a 200 OK status', async () => {
            const res = await request(server).get('/hobbits')
            expect(res.status).toBe(200);
        })
    })
    describe('[POST] /hobbits', () =>  {
        it('responds with the new hobbit', async () => {
            const res = await request(server)
                .post('/hobbits')
                .send({ name: 'bilbo' })
            expect(res.body).toMatchObject({ id: 5, name: 'bilbo' })
        })
    })
})
