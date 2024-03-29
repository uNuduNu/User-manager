const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true
    },
    username: {
        type: String,
        minlength: 1,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        required: true,
        validate:{
            // test that the email has @
            validator: v => { return /.+@.+/.test(v)},
            message: props => `${props.value} is not a valid email address`
        }
    },
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: Number,
            lng: Number
        }
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User