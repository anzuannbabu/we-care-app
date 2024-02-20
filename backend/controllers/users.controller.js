var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var UserModel = require("./../models/users.schema");
const { verifyToken } = require("../middlewares/verifyToken");

// Connecting to database
var url = "mongodb://localhost:27017/wecaredb";

const db = url;

mongoose.Promise = global.Promise;
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("db connected successfully")).catch(err => { console.error(err) });





//add token verifier middleware named [verifyToken]
router.get("/", (req, res) => {
    UserModel.find({ UserType: 1 }).then(data => {
        return res.json(data);
    }).catch(err => res.status(500).json({ error: err }));
});


module.exports = router;
