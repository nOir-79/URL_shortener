const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res)=>{
    try{
        const {username,password} = req.body

        if(!username || !password)
            return res.status(400).send('Username and password are required')
        const user = new User({
            username: username,
            password: password
        })

        const existingUser = await User.findOne({username});

        if(existingUser)
            res.status(409).send('Username already exists')

        const savedUser = await user.save()
        if(savedUser)
        {
            return res.status(201).send('The user is registered')
        }
        return res.status(501).send('The user was not registered')

    }catch(error){
        console.error('Eroor registering user:',error)
        return res.status(500).send('Internal Server Error')
    }
}

exports.login = async(req, res)=>{
    try{
        const {username,password} = req.body

        if(!username || !password)
            return res.status(400).send('Username and Password are required')
    
        const user = await User.findOne({username:username})
        console.log('user:',user)
    
        if(!user){
            return res.status(501).send("Username doesn't exist")
        }

        console.log('password:',user.password)
        if(!await bcrypt.compare(password,user.password))
            return res.status(501).send("Password doesn't match")
    
        const token = jsonwebtoken.sign({user:user},process.env.SECRET_TOKEN)
    
        res.json({token})
    }catch(error){
        console.error(error)
        return res.status(500).send('Error logging in')
    }
    
}