# User manager practice project

Store user data in database, backend provides REST interface to data and loads frontend as main page.

MongoDB used for database, NodeJS for backend, React for frontend.

Hosted on render: https://user-manager-6rba.onrender.com/

## REST API Endpoints

### GET /api/users
Retrieves all users.

### GET api/users/id  
Retrieves user defined by id. Returns _404 Not Found_ if no user with the id exists.

### POST api/users
Creates a new user using data included in request. Returns _201 Created_ on success and the created user.

### DELETE api/users/id
Removes user defined by id. Returns _204 No Content_ on success or if no user with the id existed.

### PUT api/users/id  
Replaces user defined by id using data included in request. Returns _400 Bad Request_ if data is missing.
