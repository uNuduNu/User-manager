const User = require('../models/user')

const newUser = {
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
        geo: {
            lat: 29.4572,
            lng: -164.2990
        }
    },
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: {
        name: 'Robel-Corkery',
        catchPhrase: 'Multi-tiered zero tolerance productivity',
        bs: 'transition cutting-edge web services'
    }
}

const namelessUser = {
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
        geo: {
            lat: 29.4572,
            lng: -164.2990
        }
    },
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: {
        name: 'Robel-Corkery',
        catchPhrase: 'Multi-tiered zero tolerance productivity',
        bs: 'transition cutting-edge web services'
    }
}

const usernamelessUser = {
    name: 'Patricia Lebsack',
    email: 'Julianne.OConner@kory.org',
    address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
        geo: {
            lat: 29.4572,
            lng: -164.2990
        }
    },
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: {
        name: 'Robel-Corkery',
        catchPhrase: 'Multi-tiered zero tolerance productivity',
        bs: 'transition cutting-edge web services'
    }
}

const emaillessUser = {
    name: 'Patricia Lebsack',
    username: 'Karianne',
    address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
        geo: {
            lat: 29.4572,
            lng: -164.2990
        }
    },
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: {
        name: 'Robel-Corkery',
        catchPhrase: 'Multi-tiered zero tolerance productivity',
        bs: 'transition cutting-edge web services'
    }
}

const initialUsers = [
    {
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: -37.3159,
                lng: 81.1496
            }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets'
        }
    },
    {
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
                lat: -43.9509,
                lng: -34.4618
            }
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains'
        }
    },
    {
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        address: {
            street: 'Douglas Extension',
            suite: 'Suite 847',
            city: 'McKenziehaven',
            zipcode: '59590-4157',
            geo: {
                lat: -68.6102,
                lng: -47.0653
            }
        },
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        company: {
            name: 'Romaguera-Jacobson',
            catchPhrase: 'Face to face bifurcated interface',
            bs: 'e-enable strategic applications'
        }
    }
]

const nonExistingId = async () => {
    const user = new User({ name: 'willremovethissoon', username: 'remove', email: 'r@move' })
    await user.save()
    await user.deleteOne()

    return user._id.toString()
}

const UsersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { newUser, namelessUser, usernamelessUser, emaillessUser, initialUsers, nonExistingId, UsersInDb }