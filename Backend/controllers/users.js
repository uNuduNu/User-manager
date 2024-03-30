const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', (request, response, next) => {
    User.find({})
        .then(users => response.json(users))
        .catch(error => next(error))
})

usersRouter.get('/:id', (request, response, next) => {
    User.findById(request.params.id)
        .then(user => {
            if (user === undefined) {
                response.status(404).end()
            }
            else {
                response.send(user)
            }
        })
        .catch(error => next(error))
})

usersRouter.post('/', (request, response, next) => {
    const user = new User(request.body)

    user.save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

usersRouter.put('/:id', (request, response, next) => {
    const body = request.body

    if (body === undefined) {
        const error = 'Content missing'
        return response.status(400).json({ error: error })
    }

    const user = request.body

    User.findByIdAndUpdate(request.params.id, user, { new: true, runValidators: true, context: 'query' })
        .then(updatedUser => response.json(updatedUser))
        .catch(error => next(error))
})

usersRouter.delete('/:id', (request, response, next) => {
    User.findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
        .catch(error => next(error))
})

module.exports = usersRouter