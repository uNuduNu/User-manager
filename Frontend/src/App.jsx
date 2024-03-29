import { useEffect, useState } from 'react'
import userService from './services/users'
import ControlBar from './Components/ControlBar'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'


function App() {
  const [message, setMessage] = useState(undefined)
  const [messageStatus, setMessageStatus] = useState(true)
  const [users, setUsers] = useState([]) 
  const [nameFilter, setNameFilter] = useState('')
  const [appView, setAppView] = useState(0)
  const [currentUser, setCurrentUser] = useState(undefined)


  useEffect(() => {
    userService.getAllUsers()
    .then(users => {
      setUsers(users)
    })
    .catch(error => showMessage('Failed to get users from server', error))
  }, [])

  const showMessage = (text, error) => {
    if (error !== undefined)
      console.log(error)

    setMessage(text)
    setMessageStatus(error === undefined)

    setTimeout(() => { 
      setMessage(undefined)
    }, 3000)
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

  const cancelHandler = () => {
    setCurrentUser(undefined)
    setAppView(0)
  }

  const okHandler = () => {
    if (currentUser.id === undefined){
      userService.addUser(currentUser)
        .then(user => {
          setUsers(users.concat(user))
          showMessage(`Added ${user.name}`, undefined)
        })  
        .catch(error => showMessage(`Failed to add person: ${error.response.data.error}`, error))
    }
    else {
      userService.modifyUser(currentUser)
        .then(user => {
          setUsers(users.map(p => p.id !== user.id ? p : user))
          showMessage(`Modified ${user.name}`, undefined)
        })
        .catch(error => {
          showMessage(`Failed to modify ${currentUser.name}: ${error.response.data.error}`, error)
        })      
    }

    setCurrentUser(undefined)
    setAppView(0)
  }

  const userChangeHandler = (event) => {
    const { name, value } = event.target
  
    setCurrentUser((prevCurrentUser) => ({
      ...prevCurrentUser,
      [name]: value,
    }))
  }

  const filteredUsers = nameFilter.length === 0 ? users : users.filter(user => user.name.toLowerCase().includes(nameFilter.toLowerCase()))

  if (appView !== 0)
  {
    return (
      <div>
        <UserDetails user={currentUser} cancelHandler={cancelHandler} okHandler={okHandler} userChangeHandler={userChangeHandler}/>
      </div>
    )
  }

  return (
    <div>
      <ControlBar text={message} success={messageStatus} nameInputValue={nameFilter} nameInputHandler={handleNameFilterChange} addUserHandler={addUserHandler}/>
      <UserList users={filteredUsers} removeHandler={removeUser} modifyHandler={modifyUserHandler}/>
    </div>
  )
}

export default App
