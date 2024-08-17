const jwt = require('jsonwebtoken')
const authenticateJWT = async(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ','')

    if(!token)
        return res.status(501).send('Access Denied')

    try{
        const decode = jwt.verify(token,process.env.SECRET_TOKEN)
        req.user = decode
        next()
    }catch(error){
        console.error(error)
        return res.status(500).send('Unable to authenticate jwt')
    }
}