const express = require('express')
const router = express.Router()
const { mail } = require('../controllers/MailController')


router.post('/', mail)

module.exports = router