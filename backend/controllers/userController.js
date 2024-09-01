const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.register = async(req,res)=>{
    try{
        const {username,password,email} = req.body
        if(!username && !password && !email){
            console.log('Information not provided')
            return res.status(400).send('Information not provided')
        }

        const user = await User.save({
            username:username,
            password:password,
            email:email
        })

        if(!user){
            console.log('User not registered')
            return res.status(401).send('User not saved in database')
        }
        return res.status(200).send('User registered successfully')
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

exports.login = async(req,res)=>{
    try{
        const {username,password} = req.body
        if(!username && !password){
            console.log('Insufficient information')
            return res.status(400).send('Insufficient information for login')
        }

        const user = await User.findOne({username:username})

        if(!user){
            console.log(`User with username '${username}' not found`)
        }
        if(!await bcrypt.compare(password,user.password)){
            console.log('Incorrect Password')
            return res.status(401).send('Incorrect Password')
        }

        const token = jwt.sign({user:user},process.env.SECRET_TOKEN)
        return res.status(200).send(token)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}