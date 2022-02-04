const bcrypt = require('bcrypt');
const authModel = require("../models/auth");

const getAuth = async ( username, password ) => {
    try {
        const result = await authModel.findOne({
            username: username,
            status: true
        }).then( async (data) => {
            const validPassword = await bcrypt.compare(password, data.password);
            return (validPassword) ? data : false;
        })
        return result;
    } catch (error) {
        console.log(error);
        return false
    }
}

const createAuth = async ( username, password ) => {
    try {
        const salt = await bcrypt.genSalt(5);
        const newpassword = await bcrypt.hash( password , salt);
        const result = await authModel.create({
            username: username,
            password: newpassword,
            status: false
        }).then( async (data) => {
            return data
        })
        return result;
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports.getAuth = getAuth;
module.exports.createAuth = createAuth;