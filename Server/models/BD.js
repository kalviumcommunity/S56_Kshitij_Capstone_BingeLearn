const mongoose  = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String
});

const TeachersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const UserModal = mongoose.model("users-coll", UserSchema)
const TeachersModal = mongoose.model("teachers-coll", TeachersSchema)

module.exports = {
    UserModal,
    TeachersModal
}

