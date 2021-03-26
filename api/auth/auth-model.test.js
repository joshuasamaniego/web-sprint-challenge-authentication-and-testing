const Auth = require('./auth-model');
const db = require('../../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('auth').truncate()
    await db.seed.run()
})
afterAll(async() => {
    await db.destroy();
})