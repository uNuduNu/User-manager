# User manager practice project

Store user data in database, backend provides REST interface to data and loads frontend as main page.

MongoDB used for database, NodeJS for backend, React for frontend.

## REST API
-api/users      GET      retrieves all resources
-api/users/id   GET      retrieves resource defined by id
-api/users      POST     creates a new resource using data included in request
-api/users/id   DELETE   removes resource defined by id  
-api/users/id   PUT      replaces resource defined by id using data included in request
