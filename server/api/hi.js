// const express = require('express')
import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.json({ message: '/hi' })
})
module.exports = router
