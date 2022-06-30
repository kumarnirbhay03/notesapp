const mongoose=require('mongoose');

// User Schema

const userschema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    }
});
const User=mongoose.model('User', userschema);
module.exports.User=User;
