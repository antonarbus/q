import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { api } from './api'
import { config } from './config'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { asyncHandler } from './shared/lib/express'
import { connectToDb } from './shared/lib/mongoose/connectToDb'

const startServer = async (): Promise<void> => {
  const app = express()
  await connectToDb()
  app.use(morgan('dev')) // http logs in terminal
  app.use(express.json({ limit: '50mb' })) // parses the JSON payload and adds it into'body' prop
  app.use(cookieParser()) // parses Cookie header and adds to req.cookies

  Object.entries(api).forEach(([_key, apiData]) => {
    const { method, url, handler } = apiData
    app[method](url, asyncHandler(handler)) // register express route
  })

  app.use(errorHandlerMiddleware)

  app.listen(config.back.port, () => {
    console.info(
      `🚀 ${config.installation} backend server started at ${config.back.baseUrl} based on ${config.installation} installation`,
    )
  })
}

void startServer()
