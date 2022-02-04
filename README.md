# node-js-user-crud-api
Simple NodeJS+ExpressJS web API for create, read, update and delete users with authentication and registration functionality.

---
## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/bhavsinh-ker/node-js-user-crud-api.git
    $ cd node-js-user-crud-api
    $ npm install

## Configure app

Create MongoDB database and copy the connection URL.
Rename .env-example file to .env and edit it with your settings.

## Running the project

    $ npm run dev

API end point is http://localhost:3000/api/v1

## Notes

If you are using [Postman](https://www.postman.com/), please check postman_collection folder, I had provided collection import files. 
Once you register the user for token, you need to manually activate a user from the db table.