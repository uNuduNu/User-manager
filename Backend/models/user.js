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
            message: () => 'Email address is not valid'
        }
    },
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: {
                type:Number,
                required: false,
                validate: {
                    validator: v => { return !v || /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}|90\.0{1,6}$/.test(v) },
                    message: () => 'Latitude is not a valid'
                }
            },
            lng: {
                type:Number,
                required: false,
                validate: {
                    validator: v => { return !v || /^-?((1?[0-7]?[0-9]|[1-9]?[0-9])\.\d{1,6}|180\.0{1,6})$/.test(v) },
                    message: () => 'Longitude is not valid'
                }
            }
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