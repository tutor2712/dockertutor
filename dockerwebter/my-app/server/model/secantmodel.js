const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BisectionDB = new Schema(
    {
        x0:{type: Number, required: false},
        x:{type: Number, required: false},
        fx:{type: String, required: true}
    }
)
module.exports = mongoose.model('secants',BisectionDB)