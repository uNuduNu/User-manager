
const User = ({ wide, name, username, email, id, removeHandler, modifyHandler }) => {
    const userStyle = {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: wide ? '32% 32% 32% 4%' : '93% 7%',
        borderTop: '1px solid #D8D8D8',
        padding: 4
    }

    const buttonStyle = {
        backgroundColor: '#1CA1C1',
        color: 'white',
        borderStyle: 'none',
        borderRadius: 5
    }

    const clipForDisplay = (data) => { return data.length > 30 ? data.substring(0, 27) + '...': data }

    if (wide) {
        return (
            <div style={userStyle}>
                <div onClick={() => modifyHandler(name, id)}>{clipForDisplay(name)}</div>
                <div onClick={() => modifyHandler(name, id)}>{clipForDisplay(username)}</div>
                <div onClick={() => modifyHandler(name, id)}>{clipForDisplay(email)}</div>
                <div><button style={buttonStyle} onClick={() => removeHandler(name, id)}>x</button></div>
            </div>
        )
    }

    return (
        <div style={userStyle}>
            <div onClick={() => modifyHandler(name, id)}>{name}</div>
            <div><button style={buttonStyle} onClick={() => removeHandler(name, id)}>x</button></div>
        </div>
    )
}

const UserList = ({ wide, users, removeHandler, modifyHandler }) => {
    if (users === null) {
        return null
    }

    return (
        <div>
            {users.map(user => <User key={user.id} wide={wide} name={user.name} username={user.username} email={user.email} id={user.id} removeHandler={removeHandler} modifyHandler={modifyHandler}/>)}
        </div>
    )
}
export default UserList