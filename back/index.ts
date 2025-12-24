import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import { runtimeConfig } from '@root/config/runtime'
import { api } from '@back/api'
import { errorHandlerMiddleware } from '@back/middleware/errorHandlerMiddleware'
import { asyncHandler } from '@back/shared/lib/express'

const startServer = (): void => {
  const app = express()
  app.use(morgan('dev')) // http logs in terminal
  app.use(express.json({ limit: '50mb' })) // parses the JSON payload and adds it into'body' prop
  app.use(cookieParser()) // parses Cookie header and adds to req.cookies

  Object.entries(api).forEach(([_key, apiData]) => {
    const { method, url, handler } = apiData

    // register express route
    app[method](url, asyncHandler(handler))
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

startServer()
