const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BisectionDB = new Schema(
    {
        fx:{type: String, required: true},
        x:{type: Number, required: false},
        h:{type: Number, required: false},
        d:{type: Number, required: false},
        oh:{type: Number, required: false}
    }
)
module.exports = mongoose.model('diffs',BisectionDB)