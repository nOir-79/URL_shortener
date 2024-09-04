const express = require('express')
const router = express.Router()
const linkController = require('../controllers/linkController')

router.post('/addLink',linkController.addLink)
router.get('/getOriginalLink/:shortLink',linkController.getOriginalLink)

module.exports = router