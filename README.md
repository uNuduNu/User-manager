# User manager practice project

Store user data in database, backend provides REST interface to data and loads frontend as main page.

MongoDB used for database, NodeJS for backend, React for frontend.

Hosted on render: https://user-manager-6rba.onrender.com/

## REST API Endpoints

### GET /api/users
Retrieves all users.

### GET api/users/id  
Retrieves user defined by id. Returns __404 Not Found__ if no user with the id exists.

### POST api/users
Creates a new user using data included in request. Returns __201 Created__ on success and the created user.

### DELETE api/users/id
Removes user defined by id. Returns __204 No Content__ on success or if no user with the id existed.

### PUT api/users/id  
Replaces user defined by id using data included in request. Returns __400 Bad Request__ if data is missing.
