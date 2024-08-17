require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const app = express()

const mongoose_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urlShortener'

mongoose.connect(mongoose_URI)

app.use(express.json())

app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.send('Hello User')
})

app.listen(5000)