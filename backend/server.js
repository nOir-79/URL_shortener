require('dotenv').config()
const express = require('express')
const userRouter = require('./routes/userRoutes')

const app = express()

const port = process.env.PORT || 5000


app.use(express.json())

app.use('/user',userRouter)

app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`)
})