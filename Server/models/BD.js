const mongoose  = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String
});

const VideoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    duration: { type: String, required: true },
  });

  const CourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    videos: [VideoSchema],
  });

  

  const TeachersSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    courses: [CourseSchema]
  });


const UserModal = mongoose.model("users-coll", UserSchema)
const TeachersModal = mongoose.model("teachers-coll", TeachersSchema)

module.exports = {
    UserModal,
    TeachersModal
}

