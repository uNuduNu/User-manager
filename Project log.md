# User manager project action log

## Choose technologies
Use MongoDB / Node.js / React

create repo
create vs code workspace

## Backend: Node.js
	setup backend
		create package.json
		create folder structure
		create index.js
		install express (web framework for Node.js)
		install nodemon for development (restarts backend if the files in the directory change)
		install cors (to allow same origin requests)
		install morgan (http request logger)
		install mongoose (makes it easier to use MongoDB)
		install dotenv (so we can use env variables for MongoDB password and port)
		install eslint for development (to help maintain clean readable code)
	commit
	
	add project log
	create utils
		config.js (handles dotenv / environment variables)
		logger.js (logging)
		middleware.js (error handling for express & mongoose requests)
	update index.js (start the app using parameters from config and log the port using logger)
	create app.js (express app)
	create users.js (express endpoint router)
		implement get all users endpoint
	create user.js (mongoose schema / model)
	setup database in MongoDB Atlas
	Test get all users functionality locally using browser (http://localhost:3001/api/users) (requires password to the database)
		-> OK
	commit
	
	add readme
	update project log 
	commit
	
	add REST Client requests
	modify users.js
		add support for POST / add user end point, test locally using REST client
			-> OK
		add support to GET single user with id, test locally using browser
			-> OK		
		add support for DELETE / remove user end point, test locally using REST client
			-> OK
		add support for PUT / modify user, test locally using REST client
			-> OK
	modify user.js
		add required fields (name, username, email) and validation (email must have @)
	commit
		
## Frontend: React
	setup frontend
		create react app using Vite (has HMR which makes testing easier)
		install axios (makes communication with backend easier)
	implement basic user list
		create service/users.js, (handles communication with backend using axios)
		create Components/StatusMessage.jsx (shows message if user is added etc or if there is an error)
		create Components/UserList.jsx (shows a list of users (username: name) with modify & delete buttons)
	commit

	implement user delete
		add remove handler to delete button, call REST DELETE endpoint with user id
	add controlbar
		change Components/StatusMessage.jsx to Components/ControlBar.jsx, add button for adding new user and input for filtering user list
	add some styling
	implement user detail view
		add Components/UserDetails.jsx 
	changed userlist implementation, removed modify button, clicking the name will now open detail view which allows modification
	implemented adding and modifying users
	commit
	
	improved userdetails
		refactor detail line to own component, add headers, improve style
		save button is only enabled after user makes changes
	Move StatusMessage back to its own component, show only it when needed
	Handle window width changes 
	make deployment build
	use frontend as backends main page
	test locally 
	commit

## Fixes and cleanup
	add support for geo:lat, lng fields
		add validation reg exps to mongoose schema
		improve userChangeHandler
	remove commented code

## Host
  Hosted on render

## Add API tests to backend
	install cross-env to allow using NODE_ENV for setting up test environment
	install SuperTest test library
	install express async error handler to eliminate the need to use try catch blocks with express awaits 
	create APITests.test.js
	create test_helper.js
	run tests
		make some changes to users.js as result of tests
	refactor users.js to use await
	run tests
		-> OK
	test manually that frontend still works
	commit (render will automatically deploy)

## Improve frontend
	add 'required field' text to required fields
	improve error messages for missing required fields and invalid fields
	add input validation using regexp

## Refactor frontend
	use form in detailview (allows enter to be used for saving)
 	clean the code used to display detailview / mainview / status 
  	don't hide mainview / detailview if status message is shown
 	

