# Fancy Todo App Server
Fancy Todo App is an application to manage your todos. This app has :
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

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
[
  {
    "id": <given id by system>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "user_id": <todo user id>,
    "image_url": "<todo image url>",
    "color": "<todo color>"",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  ...
]
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

### POST /todos

> Create new todo

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```
{
  msg: <success message>,
  data: {
    "id": <given id by system>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "image_url": "<todo image url>",
    "color": "<todo color>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Title is required",
    "Status is required",
    "Status must be either 'next', 'progress' or 'done'",
    "Due Date is required",
    "Date must be after this day"
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

### PUT /todos/:id

> Update existing todo

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of todo>
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```

_Response (200 - Updated)_
```
{
  msg: <success message>,
  data: {
    "id": <given id by system>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "image_url": "<todo image url>",
    "color": "<todo color>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Title is required",
    "Status is required",
    "Status must be either 'next', 'progress' or 'done'",
    "Due Date is required",
    "Date must be after this day"
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

### DELETE /todos/:id

> Delete existing todo

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of todo>
```

_Request Body_
```
not needed
```

_Response (200 - Deleted)_
```
{
  msg: <success message>,
  data: {
    "id": <given id by system>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "image_url": "<todo image url>",
    "color": "<todo color>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
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

### PUT /todos/update-image/:id

> Update existing todo image

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of todo>
```

_Request Body_
```
{
  "imageUrl": "<image url>"
}
```

_Response (200 - Updated)_
```
{
  msg: <success message>
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

### PUT /todos/update-color/:id

> Update existing todo color

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of todo>
```

_Request Body_
```
{
  "color": "<hex color>"
}
```

_Response (200 - Updated)_
```
{
  msg: <success message>
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

### PUT /todos/update-status/:id

> Update existing todo status

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
/:id <id of todo>
```

_Request Body_
```
{
  "status": "<todo status>"
}
```

_Response (200 - Updated)_
```
{
  msg: <success message>
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Status is required",
    "Status must be either 'next', 'progress' or 'done'"
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

---
### GET /todos/images?search=nature

> Get all images

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Params_
```
?search=<search term>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  images: [
    {
      "id": 6992,
      "width": 4928,
      "height": 3264,
      "url": "https://www.pexels.com/photo/dark-fog-forest-haze-6992/",
      "photographer": "Snapwire",
      "photographer_url": "https://www.pexels.com/@snapwire",
      "photographer_id": 2671,
      "src": {
          "original": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg",
          "large2x": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "large": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
          "medium": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&h=350",
          "small": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&h=130",
          "portrait": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
          "landscape": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
          "tiny": "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      "liked": false
    },
    ...
  ]
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "search term is required"
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
### POST /login

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
  "token": "<json web token string>"
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

### POST /register

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
