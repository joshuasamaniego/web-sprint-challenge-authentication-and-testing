const Restricted = require('./restricted');
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

describe('restricted middleware functionality', () => {
    describe('missing token', () => {
        it('works', () => {
            expect(true).toBe(true);
        })
    })
})
