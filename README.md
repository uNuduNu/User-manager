# User manager practice project

Store user data in database, backend provides REST interface to data and loads frontend as main page.

MongoDB used for database, NodeJS for backend, React for frontend.

Hosted on render: https://user-manager-6rba.onrender.com/

## REST API Endpoints

### GET /api/users
Retrieves all users.

### GET api/users/id  
Retrieves user defined by id.

### POST api/users
Creates a new user using data included in request.

### DELETE api/users/id
Removes user defined by id.

### PUT api/users/id  
Replaces user defined by id using data included in request.
