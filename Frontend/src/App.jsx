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
    const [showDetailView, setshowDetailView] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentUserChanged, setCurrentUserChanged] = useState(false)
    const [wide, setWide] = useState(0)

    useEffect(() => {
        userService.getAllUsers()
            .then(retrievedUsers => {
                setUsers(retrievedUsers)
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
                setUsers(users.filter(u => u.id !== id))
                showMessage(`Removed ${name}`, undefined)
            })
            .catch(error => showMessage(`Failed to remove user: ${name}`, error))
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
        setshowDetailView(true)
    }

    const modifyUserHandler = (name, id) => {
        setCurrentUser(users.filter(u => u.id === id)[0])
        setshowDetailView(true)
    }

    const backHandler = () => {
        setCurrentUser(undefined)
        setCurrentUserChanged(false)
        setshowDetailView(false)
    }

    const getUserSaveErrorMessage = (error) => {
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

    const saveHandler = (event) => {
        event.preventDefault()

        if (currentUser.id === undefined){
            userService.addUser(currentUser)
                .then(user => {
                    setUsers(users.concat(user))
                    showMessage(`Added ${user.name}`, undefined)
                    setCurrentUser(undefined)
                    setshowDetailView(false)
                    setCurrentUserChanged(false)
                })
                .catch(error => {
                    if (error.response.data.error === undefined) {
                        showMessage('Failed to add person', error)
                    }
                    else {
                        showMessage(`Failed to add person: ${getUserSaveErrorMessage(error.response.data.error)}`, error.response.data.error)
                    }
                })
        }
        else {
            userService.modifyUser(currentUser)
                .then(user => {
                    setUsers(users.map(u => u.id !== user.id ? u : user))
                    showMessage(`Modified ${user.name}`, undefined)
                    setCurrentUser(undefined)
                    setshowDetailView(false)
                    setCurrentUserChanged(false)
                })
                .catch(error => {
                    if (error.response.status === 404 || error.response.data.error === undefined) {
                        // User has been removed
                        showMessage('User has been removed from database', error)
                        setUsers(users.filter(u => u.id !== currentUser.id))
                        setCurrentUser(undefined)
                        setshowDetailView(false)
                        setCurrentUserChanged(false)
                    }
                    else {
                        showMessage(`Failed to modify ${currentUser.name}: ${getUserSaveErrorMessage(error.response.data.error)}`, error.response.data.error)
                    }
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

        if (value !== undefined && value.length !== 0) {
            // only allow numbers, letters dots, spaces, lines, underlines on input values
            if (!/^[)(\s@\-_a-zA-Z0-9 .]+$/gm.test(value))
                return

            // Lon & lat must be numbers
            if ((name === 'address.geo.lat' || name === 'address.geo.lng') && isNaN(value))
                return
        }

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

    const mainView = () => {
        return (
            <>
                <ControlBar nameInputValue={nameFilter} nameInputHandler={handleNameFilterChange} addUserHandler={addUserHandler}/>
                <UserList wide={wide} users={filteredUsers} removeHandler={removeUser} modifyHandler={modifyUserHandler}/>
            </>
        )
    }

    const detailView = () => {
        return (
            <UserDetails wide={wide} user={currentUser} userChanged={currentUserChanged} backHandler={backHandler} saveHandler={saveHandler} userChangeHandler={userChangeHandler}/>
        )
    }

    const messageBox = () => {
        return (
            <StatusMessage text={message} success={messageStatus}/>
        )
    }

    return (
        <div style={mainStyle}>
            {message !== undefined && messageBox()}
            {showDetailView === true && detailView()}
            {showDetailView === false && mainView()}
        </div>
    )
}

export default App
