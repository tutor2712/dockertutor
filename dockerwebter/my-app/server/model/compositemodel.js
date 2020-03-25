const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BisectionDB = new Schema(
    {
        fx:{type: String, required: true},
        range:{type: Number, required: false},
        start:{type: Number, required: false},
        stop:{type: Number, required: false}
    }
)
module.exports = mongoose.model('composites',BisectionDB)