import { useEffect, useState } from 'react'
import userService from './services/users'
import ControlBar from './Components/ControlBar'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import StatusMessage from './Components/StatusMessage'

function App() {
    const [message, setMessage] = useState(undefined)
    const [messageStatus, setMessageStatus] = useState(true)
    const [users, setUsers] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    const [appView, setAppView] = useState(0)
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentUserChanged, setCurrentUserChanged] = useState(false)
    const [wide, setWide] = useState(0)

    useEffect(() => {
        userService.getAllUsers()
            .then(users => {
                setUsers(users)
            })
            .catch(error => showMessage('Failed to get users from server', error))
    }, [])

    useEffect(() => {
        function handleResize() {
            setWide(window.innerWidth > 600)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [setWide])

    const showMessage = (text, error) => {
        if (error !== undefined)
            console.log(error)

        setMessage(text)
        setMessageStatus(error === undefined)

        setTimeout(() => {
            setMessage(undefined)
        }, 2000)
    }

    const removeUser = (name, id) => {
        if (false === window.confirm(`Delete ${name}?`)){
            return
        }
        userService.removeUser(id)
            .then(() => {
                setUsers(users.filter(p => p.id !== id))
                showMessage(`Removed ${name}`, undefined)
            })
            .catch(error => showMessage(`Failed to remove user: ${id}`, error))
    }

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    const addUserHandler = () => {
        const user = {
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            },
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        }
        setCurrentUser(user)
        setAppView(1)
    }

    const modifyUserHandler = (name, id) => {
        setCurrentUser(users.filter(p => p.id === id)[0])
        setAppView(2)
    }

    const backHandler = () => {
        setCurrentUser(undefined)
        setCurrentUserChanged(false)
        setAppView(0)
    }

    const saveHandler = () => {
        if (currentUser.id === undefined){
            userService.addUser(currentUser)
                .then(user => {
                    setUsers(users.concat(user))
                    showMessage(`Added ${user.name}`, undefined)
                    setCurrentUser(undefined)
                    setAppView(0)
                    setCurrentUserChanged(false)
                })
                .catch(error => showMessage(`Failed to add person: ${error.response.data.error}`, error))
        }
        else {
            userService.modifyUser(currentUser)
                .then(user => {
                    setUsers(users.map(p => p.id !== user.id ? p : user))
                    showMessage(`Modified ${user.name}`, undefined)
                    setCurrentUser(undefined)
                    setAppView(0)
                    setCurrentUserChanged(false)
                })
                .catch(error => {
                    showMessage(`Failed to modify ${currentUser.name}: ${error.response.data.error}`, error)
                })
        }
    }

    const userChangeHandler = (event) => {
        let { name, value } = event.target

        const nameClasses = name.split('.')

        if (nameClasses.length > 2) {

            showMessage('Failed to modify user', `user schema has changed: ${name}`)
            return
        }

        if (nameClasses.length === 2) {
            const userObject = currentUser[nameClasses[0]]
            userObject[nameClasses[1]] = value

            name = nameClasses[0]
            value = userObject
        }

        setCurrentUser((prevCurrentUser) => ({
            ...prevCurrentUser,
            [name]: value,
        }))

        setCurrentUserChanged(true)
    }

    const mainStyle = {
        margins:0,
        padding: 0
    }

    const filteredUsers = nameFilter.length === 0 ? users : users.filter(user => user.name.toLowerCase().includes(nameFilter.toLowerCase()))

    if (message !== undefined) {
        return (
            <div style={mainStyle}>
                <StatusMessage text={message} success={messageStatus}/>
            </div>
        )
    }
    if (appView !== 0) {
        return (
            <div style={mainStyle}>
                <UserDetails wide={wide} user={currentUser} userChanged={currentUserChanged} backHandler={backHandler} saveHandler={saveHandler} userChangeHandler={userChangeHandler}/>
            </div>
        )
    }

    return (
        <div style={mainStyle}>
            <ControlBar nameInputValue={nameFilter} nameInputHandler={handleNameFilterChange} addUserHandler={addUserHandler}/>
            <UserList wide={wide} users={filteredUsers} removeHandler={removeUser} modifyHandler={modifyUserHandler}/>
        </div>
    )
}

export default App
