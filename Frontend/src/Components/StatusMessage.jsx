const StatusMessage = ({text, success}) => {
    if (text === null) {
      return null
    }
  
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

export default StatusMessage