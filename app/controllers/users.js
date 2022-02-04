
const userServices = require("../services/users");

const listUsers = async (req, res, next) => {
    const limit = (req.query.limit) ? req.query.limit : -1;
    let users = false;

    if( limit === -1 ) {
        users = await userServices.getAllUsers();
        users = {
            docs: users
        }
    } else {
        const page = (req.query.paged) ? req.query.paged : 1;
        users = await userServices.getUsers( limit, page );
    }
    
    let responseObj = {
        status: false,
        data: [{
            msg: "users not found"
        }]
    }

    if( !users ) {
        res.status(404);
        res.send(responseObj);
        return;
    }

    responseObj.status = true;
    responseObj.data = users;
    res.send(responseObj);
}

const createUser = async (req, res, next) => {
    
    let responseObj = {
        status: false,
        data: [{
            msg: "Something is wrong! user is not created"
        }]
    }

    const createdUser = await userServices.createUser(req.body);
    
    if( !createdUser ) {
        res.status(400);
        res.send(responseObj);
        return;
    }
    
    responseObj.status = true;
    responseObj.data = {
        docs: [
            createdUser
        ]
    };
    res.send(responseObj);
}

const updateUser = async (req, res, next) => {
    
    let responseObj = {
        status: false,
        data: [{
            msg: "Something is wrong! user is not updated"
        }]
    }

    const userId = req.body.id;
    let userData = req.body;
    
    for (let keyName in userData) {
        if (userData[keyName] === null || userData[keyName] === undefined || userData[keyName] === "" || keyName === "id") {
            delete userData[keyName];
        }
    }
    
    const updatedUser = await userServices.updateUser( userData, userId );
    
    if( !updatedUser.modifiedCount ) {
        res.status(400);
        res.send(responseObj);
        return;
    }
    
    responseObj.status = true;
    responseObj.data = {
        msg: "user updated successfuly"
    };
    res.send(responseObj);
}

const deleteUser = async (req, res, next) => {
    
    let responseObj = {
        status: false,
        data: [{
            msg: "Something is wrong! user is not deleted"
        }]
    }

    const userId = req.body.id;
    const deleteUser = await userServices.deleteUser( userId );

    if( !deleteUser.deletedCount || deleteUser.deletedCount<=0 ) {
        res.status(400);
        res.send(responseObj);
        return;
    }
    
    responseObj.status = true;
    responseObj.data = {
        msg: "user deleted successfuly"
    };
    res.send(responseObj);
}

module.exports.listUsers = listUsers;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;