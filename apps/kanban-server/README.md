# Kanban App Server
Kanban App is an application to manage your tasks. This app has :
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /tasks

> Get all tasks

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "tasks": [
    {
      "id": <task id by system>,
      "title": <task title>,
      "user_id": <todo's user id>,
      "category_id": <task's category id>,
      "createdAt": <created date by system>,
      "updatedAt": <updated date by system>,
      "Category": {
        "title": <category title>
      }
    },
    ...
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### POST /tasks

> Create new task

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<task title>",
  "category_id": "<category_id>"
}
```

_Response (201 - Created)_
```
{
  "msg": <success message>,
  "task": {
    "id": <task id by system>,
    "title": <task title>,
    "user_id": <task's user id>,
    "category_id": <task's category id>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>,
    "Category": {
      "title": <category title>
    }
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Title is required"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### PUT /tasks/:id

> Update existing task

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of task>
```

_Request Body_
```
{
  "title": <task title>,
  "category_id": <task's category id>,
}
```

_Response (200 - Updated)_
```
{
  "msg": <success message>,
  "task": {
    "id": <task id by system>,
    "title": <task title>,
    "user_id": <task's user id>,
    "category_id": <task's category id>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>,
    "Category": {
      "title": <category title>
    }
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Title is required"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Todo not found"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### DELETE /tasks/:id

> Delete existing task

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of task>
```

_Request Body_
```
not needed
```

_Response (200 - Deleted)_
```
{
  "msg": <success message>,
  "task": {
    "id": <task id by system>,
    "title": <task title>,
    "user_id": <task's user id>,
    "category_id": <task's category id>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>,
    "Category": {
      "title": <category title>
    }
  }
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Todo not found"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

---
### GET /categories

> Get all categories

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "categories": [
    {
      "id": <task id by system>,
      "title": <category title>,
      "createdAt": <created date by system>,
      "updatedAt": <updated date by system>
    },
    ...
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### POST /categories

> Create new categories

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<task title>"
}
```

_Response (201 - Created)_
```
{
  "msg": <success message>,
  "category": {
    "id": <task id by system>,
    "title": <task title>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Title is required"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### PUT /categories/:id

> Update existing category

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of category>
```

_Request Body_
```
{
  "title": <category title>
}
```

_Response (200 - Updated)_
```
{
  "msg": <success message>,
  "category": {
    "id": <task id by system>,
    "title": <task title>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Title is required"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Category not found"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### DELETE /categories/:id

> Delete existing category

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of category>
```

_Request Body_
```
not needed
```

_Response (200 - Deleted)_
```
{
  "msg": <success message>,
  "category": {
    "id": <task id by system>,
    "title": <task title>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Category not found"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "Authentication Failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

---
### POST /users/google-sign-in

> Login user with google sign in to get token

_Request Header_
```
not needed
```

_Request Body_
```
{
  "googleToken": "<token from google>"
}
```

_Response (200)_
```
{
  "msg": "<success message>",
  "user": {
    "name": "<user's name>",
    "organization": "<user's organization>",
    "token": "<json web token string>"
  }
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### POST /users/login

> Login user to get token

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<user email>",
  "password": "<user password>"
}
```

_Response (200)_
```
{
  "msg": "<success message>",
  "user": {
    "name": "<user's name>",
    "organization": "<user's organization>",
    "token": "<json web token string>"
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Email and password is required",
    "Invalid email or password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```

### POST /users/register

> Register new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<new name>",
  "email": "<new user email>",
  "password": "<new user password>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<registered email>",
  "msg": "<success message>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Email is required",
    "Email format is not valid",
    "Email already exist",
    "Password is required",
    "Password length must be within 6 until 32"
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "Internal Server Error"
  ]
}
```
