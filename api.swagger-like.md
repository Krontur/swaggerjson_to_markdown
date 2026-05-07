# Swagger Petstore

- **Swagger Version:** `2.0`
- **API Version:** `1.0.7`

This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.

## Servers

- `https://petstore.swagger.io/v2`
- `http://petstore.swagger.io/v2`

# pet

Everything about your Pets

[Find out more](http://swagger.io)

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet/{petId}/uploadImage</code>
</div>

## uploads an image

### Parameters

| Name | Description |
|---|---|
| `petId` *required*<br>`integer($int64)`<br>`(path)` | ID of pet to update |
| `additionalMetadata`<br>`string`<br>`(formData)` | Additional data to pass to server |
| `file`<br>`file`<br>`(formData)` | file to upload |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |

#### Example Value

Status Code: `200`

```json
{
  "code": 0,
  "type": "string",
  "message": "string"
}
```

#### Model

| Property | Type | Required | Description |
|---|---|---|---|
| `code` | integer($int32) | no | none |
| `type` | string | no | none |
| `message` | string | no | none |


---

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet</code>
</div>

## Add a new pet to the store

### Parameters

| Name | Description |
|---|---|
| `body` *required*<br>`object`<br>`(body)` | Pet object that needs to be added to the store |

### Request Body

Pet object that needs to be added to the store

**Content-Type:** `application/json`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |

#### Example Value

```json
{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

**Content-Type:** `application/xml`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |

#### Example Value

```xml
<!-- XML example not generated -->
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `405` | Invalid input |

---

<div class="api-operation api-put">
  <span class="api-method">PUT</span>
  <code class="api-path">/pet</code>
</div>

## Update an existing pet

### Parameters

| Name | Description |
|---|---|
| `body` *required*<br>`object`<br>`(body)` | Pet object that needs to be added to the store |

### Request Body

Pet object that needs to be added to the store

**Content-Type:** `application/json`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |

#### Example Value

```json
{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

**Content-Type:** `application/xml`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |

#### Example Value

```xml
<!-- XML example not generated -->
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `400` | Invalid ID supplied |
| `404` | Pet not found |
| `405` | Validation exception |

---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/pet/findByStatus</code>
</div>

## Finds Pets by status

Multiple status values can be provided with comma separated strings

### Parameters

| Name | Description |
|---|---|
| `status` *required*<br>`array[string]`<br>`(query)` | Status values that need to be considered for filter |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid status value |

#### Example Value

Status Code: `200`

```json
[
  {
    "id": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "doggie",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
]
```

#### Model

**Array of:**

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |


---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/pet/findByTags</code>
</div>

## Finds Pets by tags

> [!warning]
> This operation is deprecated.

Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

### Parameters

| Name | Description |
|---|---|
| `tags` *required*<br>`array[string]`<br>`(query)` | Tags to filter by |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid tag value |

#### Example Value

Status Code: `200`

```json
[
  {
    "id": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "doggie",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
]
```

#### Model

**Array of:**

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |


---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/pet/{petId}</code>
</div>

## Find pet by ID

Returns a single pet

### Parameters

| Name | Description |
|---|---|
| `petId` *required*<br>`integer($int64)`<br>`(path)` | ID of pet to return |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid ID supplied |
| `404` | Pet not found |

#### Example Value

Status Code: `200`

```json
{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

#### Model

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |


---

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet/{petId}</code>
</div>

## Updates a pet in the store with form data

### Parameters

| Name | Description |
|---|---|
| `petId` *required*<br>`integer($int64)`<br>`(path)` | ID of pet that needs to be updated |
| `name`<br>`string`<br>`(formData)` | Updated name of the pet |
| `status`<br>`string`<br>`(formData)` | Updated status of the pet |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `405` | Invalid input |

---

<div class="api-operation api-delete">
  <span class="api-method">DELETE</span>
  <code class="api-path">/pet/{petId}</code>
</div>

## Deletes a pet

### Parameters

| Name | Description |
|---|---|
| `api_key`<br>`string`<br>`(header)` | none |
| `petId` *required*<br>`integer($int64)`<br>`(path)` | Pet id to delete |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `400` | Invalid ID supplied |
| `404` | Pet not found |

---

# store

Access to Petstore orders

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/store/inventory</code>
</div>

## Returns pet inventories by status

Returns a map of status codes to quantities

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |

#### Example Value

Status Code: `200`

```json
{}
```

#### Model

`object`


---

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/store/order</code>
</div>

## Place an order for a pet

### Parameters

| Name | Description |
|---|---|
| `body` *required*<br>`object`<br>`(body)` | order placed for purchasing the pet |

### Request Body

order placed for purchasing the pet

**Content-Type:** `application/json`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `petId` | integer($int64) | no | none |
| `quantity` | integer($int32) | no | none |
| `shipDate` | string($date-time) | no | none |
| `status` | string | no | Order Status |
| `complete` | boolean | no | none |

#### Example Value

```json
{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2026-01-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid Order |

#### Example Value

Status Code: `200`

```json
{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2026-01-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

#### Model

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `petId` | integer($int64) | no | none |
| `quantity` | integer($int32) | no | none |
| `shipDate` | string($date-time) | no | none |
| `status` | string | no | Order Status |
| `complete` | boolean | no | none |


---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/store/order/{orderId}</code>
</div>

## Find purchase order by ID

For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions

### Parameters

| Name | Description |
|---|---|
| `orderId` *required*<br>`integer($int64)`<br>`(path)` | ID of pet that needs to be fetched |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid ID supplied |
| `404` | Order not found |

#### Example Value

Status Code: `200`

```json
{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2026-01-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

#### Model

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `petId` | integer($int64) | no | none |
| `quantity` | integer($int32) | no | none |
| `shipDate` | string($date-time) | no | none |
| `status` | string | no | Order Status |
| `complete` | boolean | no | none |


---

<div class="api-operation api-delete">
  <span class="api-method">DELETE</span>
  <code class="api-path">/store/order/{orderId}</code>
</div>

## Delete purchase order by ID

For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors

### Parameters

| Name | Description |
|---|---|
| `orderId` *required*<br>`integer($int64)`<br>`(path)` | ID of the order that needs to be deleted |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `400` | Invalid ID supplied |
| `404` | Order not found |

---

# user

Operations about user

[Find out more about our store](http://swagger.io)

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/user/createWithList</code>
</div>

## Creates list of users with given input array

### Parameters

| Name | Description |
|---|---|
| `body` *required*<br>`array[object]`<br>`(body)` | List of user object |

### Request Body

List of user object

**Content-Type:** `application/json`

**Array of:**

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `username` | string | no | none |
| `firstName` | string | no | none |
| `lastName` | string | no | none |
| `email` | string | no | none |
| `password` | string | no | none |
| `phone` | string | no | none |
| `userStatus` | integer($int32) | no | User Status |

#### Example Value

```json
[
  {
    "id": 0,
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "userStatus": 0
  }
]
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `default` | successful operation |

---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/user/{username}</code>
</div>

## Get user by user name

### Parameters

| Name | Description |
|---|---|
| `username` *required*<br>`string`<br>`(path)` | The name that needs to be fetched. Use user1 for testing.  |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid username supplied |
| `404` | User not found |

#### Example Value

Status Code: `200`

```json
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}
```

#### Model

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `username` | string | no | none |
| `firstName` | string | no | none |
| `lastName` | string | no | none |
| `email` | string | no | none |
| `password` | string | no | none |
| `phone` | string | no | none |
| `userStatus` | integer($int32) | no | User Status |


---

<div class="api-operation api-put">
  <span class="api-method">PUT</span>
  <code class="api-path">/user/{username}</code>
</div>

## Updated user

This can only be done by the logged in user.

### Parameters

| Name | Description |
|---|---|
| `username` *required*<br>`string`<br>`(path)` | name that need to be updated |
| `body` *required*<br>`object`<br>`(body)` | Updated user object |

### Request Body

Updated user object

**Content-Type:** `application/json`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `username` | string | no | none |
| `firstName` | string | no | none |
| `lastName` | string | no | none |
| `email` | string | no | none |
| `password` | string | no | none |
| `phone` | string | no | none |
| `userStatus` | integer($int32) | no | User Status |

#### Example Value

```json
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `400` | Invalid user supplied |
| `404` | User not found |

---

<div class="api-operation api-delete">
  <span class="api-method">DELETE</span>
  <code class="api-path">/user/{username}</code>
</div>

## Delete user

This can only be done by the logged in user.

### Parameters

| Name | Description |
|---|---|
| `username` *required*<br>`string`<br>`(path)` | The name that needs to be deleted |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `400` | Invalid username supplied |
| `404` | User not found |

---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/user/login</code>
</div>

## Logs user into the system

### Parameters

| Name | Description |
|---|---|
| `username` *required*<br>`string`<br>`(query)` | The user name for login |
| `password` *required*<br>`string`<br>`(query)` | The password for login in clear text |

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `200` | successful operation |
| `400` | Invalid username/password supplied |

#### Example Value

Status Code: `200`

```json
"string"
```

#### Model

`string`


---

<div class="api-operation api-get">
  <span class="api-method">GET</span>
  <code class="api-path">/user/logout</code>
</div>

## Logs out current logged in user session

### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `default` | successful operation |

---

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/user/createWithArray</code>
</div>

## Creates list of users with given input array

### Parameters

| Name | Description |
|---|---|
| `body` *required*<br>`array[object]`<br>`(body)` | List of user object |

### Request Body

List of user object

**Content-Type:** `application/json`

**Array of:**

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `username` | string | no | none |
| `firstName` | string | no | none |
| `lastName` | string | no | none |
| `email` | string | no | none |
| `password` | string | no | none |
| `phone` | string | no | none |
| `userStatus` | integer($int32) | no | User Status |

#### Example Value

```json
[
  {
    "id": 0,
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "userStatus": 0
  }
]
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `default` | successful operation |

---

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/user</code>
</div>

## Create user

This can only be done by the logged in user.

### Parameters

| Name | Description |
|---|---|
| `body` *required*<br>`object`<br>`(body)` | Created user object |

### Request Body

Created user object

**Content-Type:** `application/json`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `username` | string | no | none |
| `firstName` | string | no | none |
| `lastName` | string | no | none |
| `email` | string | no | none |
| `password` | string | no | none |
| `phone` | string | no | none |
| `userStatus` | integer($int32) | no | User Status |

#### Example Value

```json
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}
```


### Responses

**Response content type:** `application/json`

| Code | Description |
|---|---|
| `default` | successful operation |

---

# Schemas

## ApiResponse

- **Type:** `object`

| Property | Type | Required | Description |
|---|---|---|---|
| `code` | integer($int32) | no | none |
| `type` | string | no | none |
| `message` | string | no | none |

#### Example Value

```json
{
  "code": 0,
  "type": "string",
  "message": "string"
}
```

## Category

- **Type:** `object`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `name` | string | no | none |

#### Example Value

```json
{
  "id": 0,
  "name": "string"
}
```

## Pet

- **Type:** `object`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `category` | object | no | none |
| `name` | string | yes | none |
| `photoUrls` | array[string] | yes | none |
| `tags` | array[object] | no | none |
| `status` | string | no | pet status in the store |

#### Example Value

```json
{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}
```

## Tag

- **Type:** `object`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `name` | string | no | none |

#### Example Value

```json
{
  "id": 0,
  "name": "string"
}
```

## Order

- **Type:** `object`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `petId` | integer($int64) | no | none |
| `quantity` | integer($int32) | no | none |
| `shipDate` | string($date-time) | no | none |
| `status` | string | no | Order Status |
| `complete` | boolean | no | none |

#### Example Value

```json
{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2026-01-01T00:00:00Z",
  "status": "placed",
  "complete": true
}
```

## User

- **Type:** `object`

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | integer($int64) | no | none |
| `username` | string | no | none |
| `firstName` | string | no | none |
| `lastName` | string | no | none |
| `email` | string | no | none |
| `password` | string | no | none |
| `phone` | string | no | none |
| `userStatus` | integer($int32) | no | User Status |

#### Example Value

```json
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}
```
