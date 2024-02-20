var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var UserModel = require("./../models/users.schema");
const jwt = require('jsonwebtoken');
const { JWT_SIGNING_KEY } = require('./../middlewares/verifyToken');
const { hashPassword, comparePassword } = require("../helpers/password");
var UserModel = require("./../models/users.schema");


// Connecting to database
var url = "mongodb://localhost:27017/wecaredb";

const db = url;

mongoose.Promise = global.Promise;
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("db connected successfully")).catch(err => { console.error(err) });



router.post("/token", async (req, res) => {
    const { username, password } = req.body;
    //selecte user with that username
    UserModel.findOne({ Email: username }).then(async data => {


        if (!data) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const pwdVerified = await comparePassword(password, data.Password);
        if (pwdVerified) {
            // console.log("password verified", data.Password)
            const user = {
                id: data.id,
                name: data.Name,
                email: data.Email,
                userCategory: data.UserType == 1 ? "couch" : "couchee",
                role: data.UserType == 1 ? "Couch" : "User",
                mobile: data.Mobile,
                specialty: data.UserType == 1 ? data.Specialty : 'N/A',
                dob: new Date(data.Birthday)
            }
            let token = jwt.sign({ user: user, expires_at: 3600 }, JWT_SIGNING_KEY);
            res.json({
                access_token: token,
                expires_at: token.expires_at
            });
        } else {
            res.status(400).json({ message: "Invalid Credentials" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to validate user credentials, please contact support team" })
    })




});

//TODO: no validation has been done so far, so please dont forget to validate the user inputs
router.post("/registerCouch", async (req, res) => {
    var newUser = new UserModel();
    newUser.Name = req.body.name;

    newUser.Password = await hashPassword(req.body.password); //this shouyld be hashed, but for now let keet it as it is
    newUser.Email = req.body.email;
    newUser.Birthday = req.body.birthday; //this may cause errors, we need to parse as date here
    newUser.Gender = req.body.gender;
    newUser.Mobile = req.body.mobile; //this may need parsing string to number
    newUser.PinCode = req.body.pinCode;
    newUser.City = req.body.city;
    newUser.State = req.body.state;
    newUser.Country = req.body.country;
    newUser.UserType = 1;

    newUser.Specialty = req.body.specialty; //this is optional when userType is 0

    const existingUser = await UserModel.findOne({ Email: req.body.email });
    if (existingUser) {
        res.status(400).json({
            message: "Email is already taken"
        })
    } else {
        newUser.save().then(data => {
            let _response = data;
            delete _response.Password;//remove password from the response
            res.json(_response);
        }).catch(err => res.status(500).json(err));
    }
});


router.post("/registerUser", async (req, res) => {
    var newUser = new UserModel();
    newUser.Name = req.body.name;
    newUser.Password = await hashPassword(req.body.password); //this shouyld be hashed, but for now let keet it as it is
    newUser.Email = req.body.email;
    newUser.Birthday = req.body.birthday; //this may cause errors, we need to parse as date here
    newUser.Gender = req.body.gender;
    newUser.Mobile = req.body.mobile; //this may need parsing string to number
    newUser.PinCode = req.body.pinCode;
    newUser.City = req.body.city;
    newUser.State = req.body.state;
    newUser.Country = req.body.country;
    newUser.UserType = 0;
    // newUser.Specialty = req.body.Specialty; //this is optional when userType is 0

    const existingUser = await UserModel.findOne({ Email: req.body.email });
    if (existingUser) {
        res.status(400).json({
            message: "Email is already taken"
        })
    } else {
        newUser.save().then(data => {
            let _response = data;
            delete _response.Password;//remove password from the response
            res.json(_response);
        }).catch(err => res.status(500).json(err));
    }
});

module.exports = router;
