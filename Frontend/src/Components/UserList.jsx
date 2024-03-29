
const User = ({name, username, id, removeHandler, modifyHandler}) => {
    const userStyle = {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '3fr 3fr 1fr 1fr',
        borderTop: '1px solid black',
        padding: 4
    }

    const buttonStyle = {
        borderStyle: 'none',
        borderRadius: 15
    }

    return (
        <div style={userStyle}>
            <div>{username}:</div>
            <div>{name}</div>
            <div><button style={buttonStyle} onClick={() =>modifyHandler(name, id)}>m</button></div>
            <div><button style={buttonStyle} onClick={() =>removeHandler(name, id)}>x</button></div>
        </div>
    )
}
 
const UserList = ({users, removeHandler, modifyHandler}) => {
    if (users === null) {
        return null
    }

    return (
        <div >
          {users.map(user => <User key={user.id} name={user.name} username={user.username} id={user.id} removeHandler={removeHandler} modifyHandler={modifyHandler}/>)}
        </div>
    )
}    
export default UserList