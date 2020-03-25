const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://ter:5691212@cluster0-c0txk.azure.mongodb.net/hadis', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db