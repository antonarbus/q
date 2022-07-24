const express = require('express')
const router = express.Router()
router.get('/', function(req, res, next) {
  res.json({ message: '/hi' })
})
module.exports = router
