const mongoose  = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String
});


const UserModal = mongoose.model("users-coll", UserSchema)

module.exports = {
    UserModal
}

