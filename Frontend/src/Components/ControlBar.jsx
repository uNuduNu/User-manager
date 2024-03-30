const ControlBar = ({ nameInputValue, nameInputHandler, addUserHandler }) => {
    const navStyle = {
        backgroundColor: '#4A4E58',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'space-between',
        padding: 4
    }

    const inputGroupStyle = {
        backgroundColor: '#4A4E58',
    }

    const buttonStyle = {
        marginTop: 2,
        backgroundColor: '#1CA1C1',
        color: 'white',
        borderStyle: 'none',
        borderRadius: 5,
        padding: 8,
        position: 'relative'
    }

    const inputStyle = {
        width: 300,
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        outline: 'none'
    }

    return (
        <nav style={navStyle}>
            <div>
                <button style={buttonStyle} onClick={() => addUserHandler()}>Add user</button>
            </div>
            <div style={inputGroupStyle}>
                <input style={inputStyle} value={nameInputValue} onChange={nameInputHandler} placeholder="Filter list..." />
            </div>
        </nav>
    )
}

export default ControlBar