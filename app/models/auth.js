const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authSchema = new schema({
    username: String,
    password: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model( 'auth', authSchema );