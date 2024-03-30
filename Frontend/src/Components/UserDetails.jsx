const UserDetailLine = ({ label, valueName, value, handler }) => {
    const divStyle = {
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
        padding: 2,
        margin: 0
    }

    const labelStyle = {
        fontSize: 13,
        margin: 0,
        paddingTop: 7,
        paddingRight: 4,
        textAlign: 'right',
        fontWeight: 'bold'
    }

    const inputStyle = {
        margin: 2,
        fontSize: 12,
        height: 20,
        padding: 2,
        border: '1px solid #D8D8D8',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    }

    return (
        <div style={divStyle}>
            <p style={labelStyle}>{label}</p>
            <input style={inputStyle} name={valueName} value={value} onChange={handler}/>
        </div>
    )
}

const UserDetailButtons = ({ userChanged, backHandler, saveHandler }) => {

    const divStyleButtons = {
        backgroundColor: '#4A4E58',
        padding: 4,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 3fr',
    }

    const buttonStyle = {
        backgroundColor: '#1CA1C1',
        color: 'white',
        borderStyle: 'none',
        borderRadius: 5,
        padding: 8,
        position: 'relative'
    }

    const buttonStyleDisabled = {
        backgroundColor: '#86B1BA',
        color: 'white',
        borderStyle: 'none',
        borderRadius: 5,
        padding: 8,
        position: 'relative',
        disabled: true
    }

    return (
        <div style={divStyleButtons}>
            <button style={buttonStyle} onClick={() => backHandler()}>Back</button>
            <div>
            </div>
            <button disabled={!userChanged} style={userChanged ? buttonStyle : buttonStyleDisabled} onClick={() => saveHandler()}>Save</button>
        </div>
    )
}

const UserDetails = ({ wide, user, userChanged, backHandler, saveHandler, userChangeHandler }) => {

    const headerStyle = {
        fontSize: 16,
        fontWeight: 'normal',
        margin: 2,
        paddingTop: 3,
        borderBottom: '1px solid #D8D8D8'
    }

    const frameStyle = {
        maxWidth: 800,
        border: '3px solid #D8D8D8',
    }

    const userContactList = [
        { label: 'Name', valueName: 'name', value: user.name },
        { label: 'Username', valueName: 'username', value: user.username },
        { label: 'Email', valueName: 'email', value: user.email },
        { label: 'Phone', valueName: 'phone', value: user.phone },
        { label: 'Website', valueName: 'website', value: user.website }
    ]

    const userAddressList = [
        { label: 'Street', valueName: 'address.street', value: user.address.street },
        { label: 'Suite', valueName: 'address.suite', value: user.address.suite },
        { label: 'City', valueName: 'address.city', value: user.address.city },
        { label: 'ZipCode', valueName: 'address.zipcode', value: user.address.zipcode },
        { label: 'Latitude', valueName: 'address.geo.lat', value: user.address.geo.lat },
        { label: 'Longitude', valueName: 'address.geo.lng', value: user.address.geo.lng }
    ]

    const userCompanyList = [
        { label: 'Name', valueName: 'company.name', value: user.company.name },
        { label: 'Slogan', valueName: 'company.catchPhrase', value: user.company.catchPhrase },
        { label: 'Strategy', valueName: 'company.bs', value: user.company.bs }
    ]

    return (
        <div style={wide ? frameStyle : undefined}>
            <div>
                {userContactList.map(u => <UserDetailLine key={u.valueName} label={u.label} valueName={u.valueName} value={u.value} handler={userChangeHandler}/>)}
            </div>
            <h3 style={headerStyle}>Address</h3>
            <div>
                {userAddressList.map(u => <UserDetailLine key={u.valueName} label={u.label} valueName={u.valueName} value={u.value} handler={userChangeHandler}/>)}
            </div>
            <h3 style={headerStyle}>Company</h3>
            <div>
                {userCompanyList.map(u => <UserDetailLine key={u.valueName} label={u.label} valueName={u.valueName} value={u.value} handler={userChangeHandler}/>)}
            </div>
            <UserDetailButtons userChanged={userChanged} backHandler={backHandler} saveHandler={saveHandler}/>
        </div>
    )
}

export default UserDetails