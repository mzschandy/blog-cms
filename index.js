const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const postRouter = require("./routes/posts")

const app = express()
const apiPort = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory))
app.use('/api', postRouter )
app.use(express.static('client/build'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})




app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
