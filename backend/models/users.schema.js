var mongoose = require('mongoose');




var UserSchema = new mongoose.Schema({
    Name: String,
    Password: String,
    Email: String,
    Birthday: Date,
    Gender: String,
    Mobile: Number,
    PinCode: String,
    City: String,
    State: String,
    Country: String,

    UserType: Number, //0 => normal user, 1 => life couch

    //these is for couch, I have decided to put all users in one table
    Specialty: String,
});
module.exports = mongoose.model(
    'user', UserSchema, 'Users');