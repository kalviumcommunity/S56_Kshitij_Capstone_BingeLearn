const mongoose  = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String
});

const TeachersSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true},
    password: String,
    courseName: { type: String, required: false }
})


const UserModal = mongoose.model("users-coll", UserSchema)
const TeachersModal = mongoose.model("teachers-coll", TeachersSchema)

module.exports = {
    UserModal,
    TeachersModal
}

