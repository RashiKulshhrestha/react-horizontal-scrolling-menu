var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require("moment");

var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        default: () => moment().format("MMMM Do YYYY")
    },
    time: {
        type: String, 
        default: () => moment().format("h:mm a")
    },
    step1: {
        type: String,
        default: moment().add(3, 'days')
    },
    step2: {
        type: String,
        default: moment().add(6, 'days')
    },
    step3: {
        type: String,
        default: moment().add(9, 'days')
    }
})

module.exports = mongoose.model('user', UserSchema, 'users');