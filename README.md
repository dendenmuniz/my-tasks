<h1 align="center">Hi 👋, I'm Denise Muniz</h1>
<h3 align="center">A passionate creative, and curious, and dynamic person.</h3>


# My Tasks - ToDo List App

The easiest way to manage your tasks.
This is a React project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of contentes
 - [General info](#general-info)
 - [Screenshots](#screenshots)
 - [Technologies and Tools](#technologies-and-tools)
 - [Setup](#setup)
 - [Requirements](#requirements)
 - [Contact](#contact)
 - [Licence](#licence)

## General info

  My Tasks as the name says is a ToDo list app to help people keep track of their tasks day-by-day. 

## Screenshots
![Screenshot from 2021-12-12 21-03-27](https://user-images.githubusercontent.com/57671852/145728332-58f3b15b-c195-47d1-989f-d0f23376a9da.png)

![Screenshot from 2021-12-12 21-03-47](https://user-images.githubusercontent.com/57671852/145728337-abace18f-3a20-4f00-9303-420e1b79555b.png)

![Screenshot from 2021-12-12 21-04-08](https://user-images.githubusercontent.com/57671852/145728338-094aaf0c-c860-4d07-aba1-1c167792c37a.png)

## Technologies / Tools

 - react         - 17.0.2
 - typescript    -  4.1.2
 - types/react   - 17.0.0
 - shortid       -  2.2.16
 - types/shortid -  0.0.29

## Setup

Instructions to run a local copy for development/test.

### Prerequisites

- Instal `Nodejs` - version >12.*
- Instal `yarn`
- Install a proper IDE/Text editor for TypeScript. It's therefore recommended to use VS Code or any other TypeScript-friendly IDE.

### Starting the development server

To start the mock API - JSON server - run 
```
npx json-server --watch data/db.json --port 8000
```

To start the frontend server from the directory of the project run 
```
yarn install
``` 
Then run the command below to start the application.
```
yarn start
```


## Requirements

- Create a to do containing a text of what to do.
- View all to dos.
- Mark a to do as "done" or "not done".
- Filter to dos on "done", "not done" and/or contains a specific string.
- Delete a to do.
The API should be mocked on the FE.

API spec:
```
POST /todos create a todo {"text": "Buy wheat", "done": False}
GET /todos list all todos [{"id": 1, "text": "Buy wheat", "done": False}, {"id": 2. "text": "Make
bread", "done": False}]
PUT /todos/1 update a todo {"done": True}
DELETE /todos/2
```

## Contact

Denise Muniz - dendenmuniz@gmail.com

## License
[MIT](https://choosealicense.com/licenses/mit/)
