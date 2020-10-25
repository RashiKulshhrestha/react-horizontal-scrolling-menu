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
    img: {
        data: Buffer,
        contentType: String
    },
    date: {
        type: String, 
        default: () => moment().format("MMMM Do YYYY")
    },
    time: {
        type: String, 
        default: () => moment().format("h:mm a")
    }
})

module.exports = mongoose.model('user', UserSchema, 'users');