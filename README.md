# CRUD API

Simple CRUD API using in-memory database underneath.

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 16 LTS version of Node.js
- Prefer asynchronous API whenever possible

## Installation

1. Clone this repository to your computer.
2. Run next command to install dependencies.

```
npm install
```
3. There are two modes to run this application: `development` and `production`. If you run it in `development` mode, all changes to the source files will be shown to you without restart application. In `production` mode, you should restart application every time, when you want to see new changes.

4. You can run tests to check that everything is good. (See Testing section.)

## Start application in development

You should run next command.

```
npm run start:dev
```

Expected output: 
`Start server on port: 8080`

To stop application use `Ctrl + C` combination.

## Start application in production

You should run next command.

```
npm run start:prod
```

Expected output: 
`Start server on port: 8080`

To stop application use `Ctrl + C` combination.

## Start cluster

There is implemented horizontal scaling for application. You can starts multiple instances of the application using the Node.js `Cluster` API (equal to the number of logical processor cores on the computer) with a **load balancer** that distributes requests across them). To start cluster you should run next command.

```
npm run start:multi
```

Expected output:
```
Primary 23675 is running
Worker 23682 started on port 8080
Worker 23683 started on port 8080
Worker 23685 started on port 8080
Worker 23688 started on port 8080
```

It will create some instances of the application. To stop cluster use `Ctrl + C` combination.

## Testing

You should run next command.

```
npm run test
```

Expected result: all test suites passed.

## How to use application

It's CRUD API. There is a list of endpoints. To send requests you can use console or any program like Postman.

Application is available on url: http://localhost:8080

You can change port in `.env` file.

Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side,
- `username` — user's name (`string`, **required**),
- `age` — user's age (`number`, **required**),
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**).

## Endpoints

- **GET** `api/users` — get all users
    - Server should answer with `status code` **200** and all users records

    Example request:
    ```
    curl --location --request GET 'http://localhost:8080/api/users'
    ```

    Example response:
    ```
    [
        {
            "id": "db2c0037-ca00-43cc-941f-30588f36be2d",
            "username": "Ivan",
            "age": 26,
            "hobbies": [
                "puzzles",
                "cinema"
            ]
        }
    ]
    ```

- **POST** `api/users` — create new user
    - Server should answer with `status code` **201** and newly created record
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

    Example request:
    ```
    curl --location --request POST 'http://localhost:8080/api/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "Ivan",
        "age": 26,
        "hobbies": ["puzzles", "cinema"]
    }'
    ```

    Example response:
    ```
    {
        "id": "db2c0037-ca00-43cc-941f-30588f36be2d",
        "username": "Ivan",
        "age": 26,
        "hobbies": [
            "puzzles",
            "cinema"
        ]
    }
    ```

- **GET** `api/users/{userId}` — get user by id
    - Server should answer with `status code` **200** and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

    Example request:
    ```
    curl --location --request GET 'http://localhost:8080/api/users/db2c0037-ca00-43cc-941f-30588f36be2d'
    ```

    Example response:
    ```
    {
        "id": "db2c0037-ca00-43cc-941f-30588f36be2d",
        "username": "Ivan",
        "age": 26,
        "hobbies": [
            "puzzles",
            "cinema"
        ]
    }
    ```

- **PUT** `api/users/{userId}` — update user (all data will be changed)
    - Server should answer with` status code` **200** and updated record
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

    Example request:
    ```
    curl --location --request PUT 'http://localhost:8080/api/users/db2c0037-ca00-43cc-941f-30588f36be2d' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "Lev",
        "age": 57,
        "hobbies": ["music"]
    }'
    ```

    Example response:
    ```
    {
        "id": "db2c0037-ca00-43cc-941f-30588f36be2d",
        "username": "Lev",
        "age": 57,
        "hobbies": [
            "music"
        ]
    }
    ```

- **DELETE** `api/users/{userId}` — delete user
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

    Example request:
    ```
    curl --location --request DELETE 'http://localhost:8080/api/users/db2c0037-ca00-43cc-941f-30588f36be2d'
    ```

    Example response: Nothing, just **204** status code.

- Requests to non-existing endpoints will response with `status code` **404** and corresponding message

