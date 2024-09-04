const mongoose = require('mongoose')

linkSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    link:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    expiresAt:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Link', linkSchema);