import { useEffect, useState } from 'react'
import userService from './services/users'
import StatusMessage from './Components/StatusMessage'
import UserList from './Components/UserList'


function App() {
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(true)
  const [users, setUsers] = useState([]) 


  useEffect(() => {
    userService.getAllUsers()
    .then(users => {
      setUsers(users)
    })
    .catch(error => showMessage('Failed to get users from server', error))
  }, [])

  const showMessage = (text, error) => {
    if (error !== null)
      console.log(error)

    setMessage(text)
    setMessageStatus(error === null)

    setTimeout(() => { 
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <StatusMessage text={message} success={messageStatus}/>    
      <UserList users={users} removeHandler={null} modifyHandler={null}/>
    </div>
  )
}

export default App
