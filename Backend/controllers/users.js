const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)

    if (user === null) {
        response.status(404).end()
    }
    else {
        response.status(200).json(user)
    }
})

usersRouter.post('/', async (request, response) => {
    const user = new User(request.body)

    const addedUser = await user.save()
    response.status(201).json(addedUser)
})

usersRouter.put('/:id', async (request, response) => {
    const user = request.body

    if (user === undefined) {
        const error = 'Content missing'
        return response.status(400).json({ error: error })
    }

    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true, runValidators: true, context: 'query' })

    if (updatedUser === null){
        response.status(404).end()
    }
    else {
        response.status(201).json(updatedUser)
    }
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter