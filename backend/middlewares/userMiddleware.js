const jwt = require('jsonwebtoken')
exports.loginAuthorize = async (req,res,next)=>{
    const token = req.header.Authorization?.replace('Bearer ','')

    if(!token){
        return res.status(400).send('Access Denied')
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const user = decoded.user
        req.user = user
        next()
    }catch(error){
        console.error(error)
        return res.status(500).send('Invalid Token')
    }
}