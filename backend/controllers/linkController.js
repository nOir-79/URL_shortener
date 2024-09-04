const Link = require('../models/link')
const User = require('../models/user')
const QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment-timezone')

exports.addLink = async(req, res)=>{
    try{
        const {reqLink,userId} = req.body
        if(!reqLink){
            console.log('You have to provide a link')
            return res.status(400).send('You have to provide a link')
        }
        const id = uuidv4()
        const link = new Link({
            id:id,
            link:reqLink,
        })
        const addedLink = await link.save()
        await Link.collection.createIndex({expiresAt:1},{expireAfterSecond:0})
        console.log("Indices:",await Link.collection.getIndexes())

        if(!addedLink){
            console.log('The link is not saved')
            return res.status(401).send('Something is wrong with saving the link')
        }

        const user = User.updateOne({_id:userId},{$push:{links:addedLink._id}})

        return res.status(200).send('The link is saved in the database')
    }catch(error){
        console.error(error.message)
        return res.status(500).send('Internal Server Error')
    }
}

exports.getOriginalLink = async(req,res)=>{
    try{
        const shortLink = req.params.shortLink

        if(!shortLink){
            console.log('No short link provided')
            return res.status(400).send('No short link provided')
        }

        const originalLink = await Link.findOne({id:shortLink})

        if(!originalLink){
            console.log('No links mapped to that shortlink')
            return res.status(401).send('No links mapped to that shortlink')
        }

        return res.status(200).send(originalLink.link)
    }catch(error){
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
}

exports.getQRcode = async(req,res)=>{
    try{
        const originalURL = req.query.originalLink
        console.log(req.params)
        if(!originalURL){
            console.log('No url provided')
            return res.status(401).send('No URL provided')
        }

        const qrCode = await QRCode.toDataURL(originalURL)

        if(!qrCode){
            console.log('Error generating QRcode')
            return res.status(402).send('Error generating QRcode')
        }

        return res.status(200).send(qrCode)
    }catch(error){
        console.error(error.message)
        return res.status(500).send('Internal Server Error')
    }
}