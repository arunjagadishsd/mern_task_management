const mongoose = require('mongoose')
const {
    Schema,
    model
} = mongoose

const statusSchema = new Schema({
    text: {
        type: String,
        required: true
    }
})
module.exports = Status = model('Status', statusSchema)