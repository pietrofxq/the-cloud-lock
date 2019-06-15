## Installing

This project uses create-react-app with a backend provided by json-server. [material-ui](https://github.com/mui-org/material-ui) was used for UI components. To install everything, run `yarn` in the root directory.

## Running

`npm start` will start the client application and the json server by using [concurrently](https://github.com/kimmobrunfeldt/concurrently).

## Using

All the application data is centralized in the file `db.json`. It's used by `json-server` to generate automatically a REST API that operates on this file.

The file ships with 2 users: `storage_user` and `front_user`. For the sake of simplicity, the login page consists only of a username.

`storage_user` can open the Storage door, and `front_user` can open the Front door. 

The main page is where you can try to open doors and see the event log. There are pages for creating doors, creating users and setting permissions, accessible by the header.