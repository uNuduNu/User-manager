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
    const [detailView, setDetailView] = useState(false)
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
            address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
            company: { name: '', catchPhrase: '', bs: '' }
        }
        setCurrentUser(user)
        setDetailView(true)
    }

    const modifyUserHandler = (name, id) => {
        setCurrentUser(users.filter(p => p.id === id)[0])
        setDetailView(true)
    }

    const backHandler = () => {
        setCurrentUser(undefined)
        setCurrentUserChanged(false)
        setDetailView(false)
    }

    const getUserSaveErrorMessage = (error) => {
        console.log(error)
        let errorMessage = error
        if (error.includes('alidation failed')) {
            if (error.includes('is required')) {
                if (error.includes('username')) {
                    errorMessage = 'username is required'
                }
                else if (error.includes('name')) {
                    errorMessage = 'name is required'
                }
                else if (error.includes('email')) {
                    errorMessage = 'email is required'
                }
            }
            else if (error.includes('email')) {
                errorMessage = 'email has no @'
            }
            else {
                errorMessage = 'coordinates are invalid'
            }
        }
        else if (error.includes('Cast to Number failed') && error.includes('address.geo.')) {
            errorMessage = 'coordinates are invalid'
        }

        return errorMessage
    }

    const saveHandler = () => {
        if (currentUser.id === undefined){
            userService.addUser(currentUser)
                .then(user => {
                    setUsers(users.concat(user))
                    showMessage(`Added ${user.name}`, undefined)
                    setCurrentUser(undefined)
                    setDetailView(false)
                    setCurrentUserChanged(false)
                })
                .catch(error => showMessage(`Failed to add person: ${getUserSaveErrorMessage(error.response.data.error)}`, error.response.data.error))
        }
        else {
            userService.modifyUser(currentUser)
                .then(user => {
                    setUsers(users.map(p => p.id !== user.id ? p : user))
                    showMessage(`Modified ${user.name}`, undefined)
                    setCurrentUser(undefined)
                    setDetailView(false)
                    setCurrentUserChanged(false)
                })
                .catch(error => {
                    showMessage(`Failed to modify ${currentUser.name}: ${getUserSaveErrorMessage(error.response.data.error)}`, error.response.data.error)
                })
        }
    }

    // Go recursively through the object to find embedded object to update if necessary
    const updateCurrentUser = (state, keys, value) => {
        if (keys.length === 1) {
            return { ...state, [keys[0]]: value }
        }

        const [currentKey, ...remainingKeys] = keys
        return {
            ...state,
            [currentKey]: updateCurrentUser(state[currentKey] || {}, remainingKeys, value)
        }
    }

    // Use single handler for all user detail inputs
    const userChangeHandler = (event) => {
        const { name, value } = event.target

        const nameClasses = name.split('.')

        // Do not update react state directly
        const currentUserCopy = {
            ...currentUser,
            address: {
                ...currentUser.address,
                geo: {
                    ...currentUser.address.geo
                }
            },
            company : {
                ...currentUser.company
            }
        }

        setCurrentUser(updateCurrentUser(currentUserCopy, nameClasses, value))

        setCurrentUserChanged(true)
    }

    const mainStyle = { margins:0, padding: 0 }

    const filteredUsers = nameFilter.length === 0 ? users : users.filter(user => user.name.toLowerCase().includes(nameFilter.toLowerCase()))

    // Show status/error message?
    if (message !== undefined) {
        return (
            <div style={mainStyle}>
                <StatusMessage text={message} success={messageStatus}/>
            </div>
        )
    }

    // Show user detail view?
    if (detailView === true) {
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
