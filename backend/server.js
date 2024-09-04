require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const userRouter = require('./routes/userRoutes')
const linkRouter = require('./routes/linkRoutes')
const { v4: uuidv4 } = require('uuid');

const app = express()
mongoose.connect("mongodb://localhost:27017/URLshortener")
const port = process.env.PORT || 5000


app.use(express.json())

app.use('/user',userRouter)
app.use('/link',linkRouter)

app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`)
})