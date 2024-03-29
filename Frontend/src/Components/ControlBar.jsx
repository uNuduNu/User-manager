const ControlBar = ({text, success, nameInputValue, nameInputHandler, addUserHandler}) => {

  if (text !== undefined) {
    console.log(text)
    const messageStyle = {
      color: success ? 'black' : 'red',
      backgroundColor: success ? 'lightgreen' : 'white',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      borderWidth: success ? 1 : 5,
      padding: 5
    }
  
    return <div style={messageStyle}>{text}</div>
  }

  const navStyle = {
    backgroundColor: '#4A4E58',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
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
    borderRadius: 15,
    padding: 8,
    position: 'relative'
  }
  
  const inputStyle = {
    width: '90%',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
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