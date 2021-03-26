const Users = require('./users-model');
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

describe('users model', () => {
    it('works', () => {
        expect(true).toBe(true);
    })
    describe('find function', () => {
        let users;
        beforeEach( async () => {
            users = await Users.find();
        })
        it('can retrieve all users', async () => {
            expect(hobbits).toHaveLength(4);
        })
        it('retrieves hobbits with {id, name}', async () => {
            expect(hobbits[0]).toMatchObject({ id: 1, name: 'sam'});
            expect(hobbits[1]).toMatchObject({ id: 2, name: 'frodo'})
        })
    })
    describe('getById', () => {
        it('retrieves a user by its Id', async () => {
            const hobbitById = await Users.getById(1);
            expect(hobbitById).toMatchObject({ id: 1, name: 'sam'});
        })
    })
    describe('insert', () => {
        // declare a var holding a new hobbit
        // use hobbit.insert to put it in db
        // use db to grab the inserted hobbit
        // assert that it exists and has a certain shape
        it('can insert a hobbit into the db', async () => {
            const bilbo =  { name : 'bilbo' }
            await Hobbit.insert(bilbo);
            expect(await db('hobbits')).toHaveLength(5);
            expect(await db('hobbits').where({ id: 5 }).first()).toMatchObject(bilbo);
        })
        it('resolves the newly inserted hobbit', async () => {
            // here we are not REALLY testing that the db changed
            const bilbo = { name: 'bilbo' };
            const result = await Hobbit.insert(bilbo);
            expect(result).toMatchObject({ id: 5, name: 'bilbo' })
        })
    })
})