var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
    appointmentDate: Date,
    timeSlot: String,
    registeredDate: Date, //this should entered automatically

    //couch details
    couchId: String,
    couchName: String,

    //couchee details
    coucheeId: String,
    coucheeName: String,

});
module.exports = mongoose.model(
    'appointments', AppointmentSchema, 'Appointments');