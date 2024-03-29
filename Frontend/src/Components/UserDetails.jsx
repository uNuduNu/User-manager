const UserDetails = ({user, cancelHandler, okHandler, userChangeHandler}) => {

    const divStyleTop = {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        padding: 2,
        fontSize: 12
    }

    const divStyle = {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        padding: 2,
        borderTop: '1px solid #D8D8D8',
        margin: 0
    }

    const divStyleButtons = {
        padding: 4,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 3fr',
    }
    
    const labelStyle = {
        fontSize: 12,
        margin: 0,
        paddingTop: 6 
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
        margin: 0,
        fontSize: 12,
        height: 20,
        width: '90%',
        padding: 2,
        borderStyle: 'none',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    }
    
    return (
        <div>
            <div style={divStyleTop}>
                <p style={labelStyle}>Name</p>
                <input style={inputStyle}  name={'name'} value={user.name} onChange={userChangeHandler} placeholder="Enter name..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Username</p>
                <input style={inputStyle} name={'username'} value={user.username} onChange={userChangeHandler} placeholder="Enter username..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Email</p>
                <input style={inputStyle} name={'email'} value={user.email} onChange={userChangeHandler} placeholder="Enter email address..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Phone</p>
                <input style={inputStyle} name={'phone'} value={user.phone} onChange={userChangeHandler} placeholder="Enter phone number..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Website</p>
                <input style={inputStyle} name={'website'} value={user.website} onChange={userChangeHandler} placeholder="Enter url..." />
            </div>            
            <div style={divStyle}>
                <p style={labelStyle}>Street</p>
                <input style={inputStyle} name={'address.street'} value={user.address.street} onChange={userChangeHandler} placeholder="Enter street address..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Suite</p>
                <input style={inputStyle} name={'address.suite'} value={user.address.suite} onChange={userChangeHandler} placeholder="Enter suite address..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>City</p>
                <input style={inputStyle} name={'address.city'} value={user.address.city} onChange={userChangeHandler} placeholder="Enter city..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Zipcode</p>
                <input style={inputStyle} name={'address.zipcode'} value={user.address.zipcode} onChange={userChangeHandler} placeholder="Enter zipcode..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Company name</p>
                <input style={inputStyle} name={'company.name'} value={user.company.name} onChange={userChangeHandler} placeholder="Enter name of company..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Company Slogan</p>
                <input style={inputStyle} name={'company.catchPhrase'} value={user.company.catchPhrase} onChange={userChangeHandler} placeholder="Enter slogan..." />
            </div>
            <div style={divStyle}>
                <p style={labelStyle}>Business strategy</p>
                <input style={inputStyle} name={'company.bs'} value={user.company.bs} onChange={userChangeHandler} placeholder="Enter business strategy..." />
            </div>
            <div style={divStyleButtons}>
                <button style={buttonStyle} onClick={() => cancelHandler()}>Cancel</button>
                <div/>
                <button style={buttonStyle} onClick={() => okHandler()}>OK</button>
            </div>
        </div>
    )
}

export default UserDetails