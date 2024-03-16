# Ecommerce App Server
Ecommerce App is an application to manage your products. This app has :
* RESTful endpoint for product's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET All /products

> Get all products

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "products": [
    {
      "id": <product id by system>,
      "name": "<product name>",
      "description": "<product description>",
      "image_url": "<product image url>",
      "price": <product price>,
      "stock": <product stock>,
      "createdAt": <created date by system>,
      "updatedAt": <updated date by system>
    },
    ...
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

### GET All Products by Category /products

> Get all products

_Request Header_
```
not needed
```

_Request Params_
```
{
  id: <category id>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "products": [
    {
      "id": <product id by system>,
      "name": "<product name>",
      "description": "<product description>",
      "image_url": "<product image url>",
      "price": <product price>,
      "stock": <product stock>,
      "createdAt": <created date by system>,
      "updatedAt": <updated date by system>
    },
    ...
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

### GET One /products/:id

> Get one product

_Request Header_
```
not needed
```

_Request Params_
```
/:id <id of product>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <product id by system>,
  "name": "<product name>",
  "description": "<product description>",
  "image_url": "<product image url>",
  "price": <product price>,
  "stock": <product stock>,
  "createdAt": <created date by system>,
  "updatedAt": <updated date by system>
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

### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>",
  "description": "<product description>",
  "image_url": "<product image url>",
  "price": <product price>,
  "stock": <product stock>
}
```

_Response (201 - Created)_
```
{
  "msg": <success message>,
  "product": {
    "id": <product id by system>,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<product image url>",
    "price": <product price>,
    "stock": <product stock>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Name is required",
    "Image url is required",
    "Image url format is not valid",
    "Price is required",
    "Price value can't be negative",
    "Price value must be number",
    "Stock is required",
    "Stock value can't be negative",
    "Stock value must be number"
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

### PUT /products/:id

> Update existing product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
/:id <id of product>
```

_Request Body_
```
{
  "name": "<product name>",
  "description": "<product description>",
  "image_url": "<product image url>",
  "price": <product price>,
  "stock": <product stock>
}
```

_Response (200 - Updated)_
```
{
  "msg": <success message>,
  "product": {
    "id": <product id by system>,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<product image url>",
    "price": <product price>,
    "stock": <product stock>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Name is required",
    "Image url is required",
    "Image url format is not valid",
    "Price is required",
    "Price value can't be negative",
    "Price value must be number",
    "Stock is required",
    "Stock value can't be negative",
    "Stock value must be number"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Product not found"
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

### DELETE /products/:id

> Delete existing product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
/:id <id of product>
```

_Request Body_
```
not needed
```

_Response (200 - Deleted)_
```
{
  "msg": <success message>,
  "product": {
    "id": <product id by system>,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<product image url>",
    "price": <product price>,
    "stock": <product stock>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Product not found"
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

### GET All Cart /cart

> Get all products in cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": <cart id by system>,
    "userId": <user id>,
    "productId": <product id>,
    "quantity": <cart quantity>,
    "status": <cart status>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>,
    "product": {
      "id": <product id by system>,
      "name": "<product name>",
      "description": "<product description>",
      "image_url": "<product image url>",
      "price": <product price>,
      "stock": <product stock>,
      "createdAt": <created date by system>,
      "updatedAt": <updated date by system>
    }
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

### POST /cart

> Add new product into cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "productId": "<product id>"
}
```

_Response (201 - Created)_
```
{
  "msg": <success message>,
  "cart": {
    "id": <cart id by system>,
    "userId": <user id>,
    "productId": <product id>,
    "quantity": <cart quantity>,
    "status": <cart status>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Quantity is required",
    "Quantity value must be number",
    "Status is required",
    "Product is out of stock",
    "Quantity can't be more than available stock"
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

### PUT /cart/:id

> Update quantity of existing product in the cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
/:id <id of cart>
```

_Request Body_
```
{
  "productId": <product id>,
  "increment": <increment status boolean>
}
```

_Response (200 - Updated)_
```
{
  "id": <cart id by system>,
  "userId": <user id>,
  "productId": <product id>,
  "quantity": <cart quantity>,
  "status": <cart status>,
  "createdAt": <created date by system>,
  "updatedAt": <updated date by system>
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Quantity is required",
    "Quantity value must be number",
    "Status is required",
    "Product is out of stock",
    "Quantity can't be more than available stock"
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

_Response (404 - Not Found)_
```
{
  "errors": [
    "Cart not found"
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

### DELETE /cart/:id

> Delete existing cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
/:id <id of cart>
```

_Request Body_
```
not needed
```

_Response (200 - Deleted)_
```
{
  "msg": <success message>,
  "cart": {
    "id": <cart id by system>,
    "userId": <user id>,
    "productId": <product id>,
    "quantity": <cart quantity>,
    "status": <cart status>,
    "createdAt": <created date by system>,
    "updatedAt": <updated date by system>
  }
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Cart not found"
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
not needed
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
      "id": <category id by system>,
      "title": <category title>,
      "createdAt": <created date by system>,
      "updatedAt": <updated date by system>
    },
    ...
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
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<category title>"
}
```

_Response (201 - Created)_
```
{
  "msg": <success message>,
  "category": {
    "id": <category id by system>,
    "title": <category title>,
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
  "access_token": "<your access token>"
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
    "id": <category id by system>,
    "title": <category title>,
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
  "access_token": "<your access token>"
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
    "id": <category id by system>,
    "title": <category title>,
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
  "user": {
    "id": <given id by system>,
    "email": "<user's email>",
    "access_token": "<json web token string>"
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

### POST /register

> Register new user

_Request Header_
```
not needed
```

_Request Body_
```
{
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
