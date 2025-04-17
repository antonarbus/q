import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { api } from './api'
import { connectToDb } from './shared/db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { config } from './config'
import { asyncHandler } from './shared/utils/asyncHandler'

const app = express()
void connectToDb()
app.use(morgan('dev')) // http logs in terminal
app.use(express.json({ limit: '50mb' })) // parses the JSON payload and adds it into'body' prop
app.use(cookieParser()) // parses Cookie header and adds to req.cookies

Object.entries(api).forEach(([key, apiData]) => {
  const { method, url, handler } = apiData
  app[method](url, asyncHandler(handler)) // register route
})

app.use(errorHandlerMiddleware)

app.listen(config.back.port, () => {
  console.info(
    `🚀 ${config.installation} backend server started at ${config.back.baseUrl} based on ${config.installation} installation`,
  )
})
