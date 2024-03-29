
const User = ({name, id, removeHandler, modifyHandler}) => {
    const userStyle = {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '93% 7%',
        borderTop: '1px solid #D8D8D8',
        padding: 4
    }

    const buttonStyle = {
        backgroundColor: '#1CA1C1',
        color: 'white',
        borderStyle: 'none',
        borderRadius: 15
    }

    return (
        <div style={userStyle}>
            <div onClick={() => modifyHandler(name, id)}>{name}</div>
            <div><button style={buttonStyle} onClick={() => removeHandler(name, id)}>x</button></div>
        </div>
    )
}
 
const UserList = ({users, removeHandler, modifyHandler}) => {
    if (users === null) {
        return null
    }

    return (
        <div>
          {users.map(user => <User key={user.id} name={user.name} id={user.id} removeHandler={removeHandler} modifyHandler={modifyHandler}/>)}
        </div>
    )
}    
export default UserList