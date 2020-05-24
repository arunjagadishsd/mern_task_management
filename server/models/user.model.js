const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    Schema,
    model
} = mongoose

const labelSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Label = model('Label', labelSchema)