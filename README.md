# User manager practice project

## Requirements:
### Frontend:
List users, adding new user and removing user.

### Backend:
REST interface for retrieving users and adding / modifying / deleting user.
Authentication is not required.

## Design choices 
MongoDB used for database, NodeJS for backend, React for frontend.

## REST API Endpoints
Base url: https://user-manager-6rba.onrender.com/

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
