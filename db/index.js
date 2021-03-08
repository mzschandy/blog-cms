const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://mzschandy:35R5UegXdCah5Dk@plan-ly.yfoa2.mongodb.net/blog-cms?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
