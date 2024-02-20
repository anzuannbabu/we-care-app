var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var AppintmentModel = require("./../models/appointment.schema");
const UserModel = require("./../models/users.schema")
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
router.get("/", verifyToken, (req, res) => {
    //this should return the results based on the role of the user
    //if the role is couch then return all the appintments which match couchId
    //if the role is couchee then return all apppointment which match the coucheeId
    const { role, id } = req.user;
    if (role === 'Couch') {
        AppintmentModel.find({ couchId: id }).then(data => {
            return res.json(data);
        }).catch(err => res.status(500).json({ error: err }));
    } else if (role === 'User') {
        AppintmentModel.find({ coucheeId: id }).then(data => {
            return res.json(data);
        }).catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(403).json({ message: "You dont have permission to access this page. If you think this is a mistake, please contact support team" })
    }

});

/* register new appointment method */
//TODO: no validation has been done so far, so please dont forget to validate the user inputs
router.post("/", verifyToken, async (req, res) => {
    //check the role first, if its the couchee role then allow to continue with the appointment
    const { role } = req.user;
    if (role === 'User') {
        var model = new AppintmentModel();
        model.registeredDate = new Date();
        model.appointmentDate = req.body.appointmentDate;

        model.timeSlot = req.body.timeSlot;

        model.couchId = req.body.couchId;
        model.couchName = req.body.couchName;

        model.coucheeId = req.user.id;//this is extracted from the token
        model.coucheeName = req.user.name;//this is extracted from the token


        const existingCouch = await UserModel.findOne({ _id: req.body.couchId });
        if (!existingCouch) {
            res.status(404).json({
                message: "Selected Couch is not found, Please choose a valid Life Couch"
            })
        } else {
            model.save().then(data => {
                let _response = data;
                res.json(_response);
            }).catch(err => res.status(500).json(err));
        }
    } else {
        res.status(403).json({
            message: "This is allowed only for couchee not couches"
        })
    }

});

module.exports = router;
