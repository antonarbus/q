import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import { runtimeConfig } from '../config/runtime'
import { api } from './api'
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

  app.listen(runtimeConfig.back.port, () => {
    console.info(`
      Backend server started 🚀
      URL: ${runtimeConfig.back.baseUrl} 
      NODE_ENV: ${runtimeConfig.nodeEnv} 
      Environment: ${runtimeConfig.environment} 
      CI/CD pipeline: ${runtimeConfig.ci}
    `)
  })
}

void startServer()
