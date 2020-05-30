const mongoose = require('mongoose')
const {
    Schema,
    model
} = mongoose

const labelSchema = new Schema({
    text: {
        type: String,
        required: true
    }
})
module.exports = Label = model('Label', labelSchema)