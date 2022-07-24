const express = require('express')
const router = express.Router()
// router.get('/', function(req, res, next) {
//   res.json({ message: '/xxx' })
// })
// module.exports = router

router.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

module.exports = router
