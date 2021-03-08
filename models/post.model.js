const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
    },
    blurb: {
        type: String
    },
    postBy: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Post', Post)
