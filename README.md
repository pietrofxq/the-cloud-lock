## Installing

This project uses create-react-app with a backend provided by json-server. [material-ui](https://github.com/mui-org/material-ui) was used for UI components. To install everything, run `yarn` in the root directory.

## Running

`npm start` will start the client application and the json server by using [concurrently](https://github.com/kimmobrunfeldt/concurrently).

## Application

The application enables creation of users, doors, and setting permissions for users to open doors. It ships by default with 4 users:

`storage_user`: can access Storage door
`front_user`: can access Front door
`storage_front_user`: can access Storage and Front door
`no_permissions`: can't access a door

## Using

All the application data is centralized in the file `db.json`. It's used by `json-server` to generate automatically a REST API that operates on this file.

For the sake of simplicity, the login page consists only of a username (provided above).

The main page is where you can try to open doors and see the event log. There are pages for creating doors, creating users and setting permissions, accessible by the header.