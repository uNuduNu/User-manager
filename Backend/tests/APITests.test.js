const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')

const api = supertest(app)

describe('API tests with users in database', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const userObjects = helper.initialUsers.map(user => new User(user))
        const promiseArray = userObjects.map(user => user.save())
        await Promise.all(promiseArray)
    })

    describe('Retrieving users', () => {
        test('users are returned as json', async () => {
            await api
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all users are returned', async () => {
            const response = await api.get('/api/users')

            assert.strictEqual(response.body.length, helper.initialUsers.length)
        })

        test('a specific user (username) is within returned notes ', async () => {
            const response = await api.get('/api/users')

            const usernames = response.body.map(e => e.username)
            assert(usernames.includes('Bret'))
        })

        test('retrieving user with valid id succeeds with 200', async () => {
            const usersAtStart = await helper.UsersInDb()
            const userToRetrieve = usersAtStart[0]

            const response = await api
                .get(`/api/users/${userToRetrieve.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(response.body, userToRetrieve)
        })

        test('retrieving user with unused id fails with 404', async () => {
            const unusedId = await helper.nonExistingId()

            await api
                .get(`/api/users/${unusedId}`)
                .expect(404)

        })
    })

    describe('adding users', () => {
        test('succeeds with 201 valid data', async () => {
            await api
                .post('/api/users')
                .send(helper.newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAfterPost = await helper.UsersInDb()

            assert.strictEqual(usersAfterPost.length, helper.initialUsers.length + 1)

            const usernames = usersAfterPost.map(u => u.username)
            assert(usernames.includes(helper.newUser.username))
        })

        test('fails with 400 if name is missing', async () => {
            await api
                .post('/api/users')
                .send(helper.namelessUser)
                .expect(400)

            const usersAfterPost = await helper.UsersInDb()

            assert.strictEqual(usersAfterPost.length, helper.initialUsers.length)
        })

        test('fails with 400 if username is missing', async () => {
            await api
                .post('/api/users')
                .send(helper.usernamelessUser)
                .expect(400)

            const usersAfterPost = await helper.UsersInDb()

            assert.strictEqual(usersAfterPost.length, helper.initialUsers.length)
        })

        test('fails with 400 if email is missing', async () => {
            await api
                .post('/api/users')
                .send(helper.emaillessUserlessUser)
                .expect(400)

            const usersAfterPost = await helper.UsersInDb()

            assert.strictEqual(usersAfterPost.length, helper.initialUsers.length)
        })
    })

    describe('deleting users', () => {
        test('succeeds with 204 if id is valid', async () => {
            const usersAtStart = await helper.UsersInDb()
            const userToDelete = usersAtStart[0]

            await api
                .delete(`/api/users/${userToDelete.id}`)
                .expect(204)

            const usersAfterDelete = await helper.UsersInDb()

            assert.strictEqual(usersAfterDelete.length, usersAtStart.length - 1)

            const ids = usersAfterDelete.map(u => u.id)
            assert(!ids.includes(userToDelete.id))
        })

        test('nothing is removed if id is nonexisting', async () => {
            const nonexistingId = await helper.nonExistingId()

            const usersAtStart = await helper.UsersInDb()

            await api
                .delete(`/api/users/${nonexistingId}`)
                .expect(204)

            const usersAfterDelete = await helper.UsersInDb()

            assert.strictEqual(usersAfterDelete.length, usersAtStart.length)

            const ids = usersAfterDelete.map(u => u.id)
            assert(!ids.includes(nonexistingId))
        })
    })

    describe('modifying users', () => {
        test('succeeds with 201 if id is valid', async () => {
            const usersAtStart = await helper.UsersInDb()
            let userToModify = usersAtStart[0]

            userToModify.username = 'MODIFIED'

            await api
                .put(`/api/users/${userToModify.id}`)
                .send(userToModify)
                .expect(201)

            const usersAfterModify = await helper.UsersInDb()

            assert.strictEqual(usersAfterModify.length, usersAtStart.length)
            assert.strictEqual(usersAfterModify[0].id, userToModify.id)
            assert.strictEqual(usersAfterModify[0].username, userToModify.username)
        })

        test('fails with 400 if content is missing', async () => {
            const nonexistingId = await helper.nonExistingId()

            await api
                .put(`/api/users/${nonexistingId}`)
                .expect(404)

            const usersAfterModify = await helper.UsersInDb()

            const ids = usersAfterModify.map(u => u.id)
            assert(!ids.includes(nonexistingId))
        })

        test('fails with 404 if id is nonexisting', async () => {
            const nonexistingId = await helper.nonExistingId()

            const nonExistinguser = {
                ...helper.newUser,
                id: nonexistingId
            }

            await api
                .put(`/api/users/${nonExistinguser.id}`)
                .send(nonExistinguser)
                .expect(404)

            const usersAfterModify = await helper.UsersInDb()

            const ids = usersAfterModify.map(u => u.id)
            assert(!ids.includes(nonexistingId))
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})
