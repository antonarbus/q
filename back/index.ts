import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { runtimeConfig } from '@root/config/runtime'
import { api } from '@back/api'
import { errorHandlerMiddleware } from '@back/middleware/errorHandlerMiddleware'
import { asyncHandler } from '@back/shared/lib/express'

const startServer = (): void => {
  const app = express()
  app.use(compression()) // gzip compression for responses
  app.use(morgan('dev')) // http logs in terminal
  app.use(express.json({ limit: '50mb' })) // parses the JSON payload and adds it into'body' prop
  app.use(cookieParser()) // parses Cookie header and adds to req.cookies

  // Serve static files in production (JS, CSS, images, etc.)
  if (runtimeConfig.nodeEnv === 'production') {
    const frontendBuildPath = path.join(__dirname, '../../front/build')
    app.use(express.static(frontendBuildPath, { maxAge: '1y' }))
  }

  // Register API routes + /uploads
  Object.entries(api).forEach(([_key, { method, url, handler }]) => {
    app[method](url, asyncHandler(handler))
  })

  // Blog routes (static HTML blog, separate from React SPA)
  if (runtimeConfig.nodeEnv === 'production') {
    // Redirect /blog to /blog/ for consistent URLs
    app.get('/blog', (_req, res) => {
      res.redirect(301, '/blog/')
    })

    // Any /blog/* route that wasn't served by express.static should return 404
    // This prevents non-existent blog pages from falling through to React SPA
    // Express v5 requires regex syntax for wildcards
    app.get(/^\/blog\/.*/u, (_req, res) => {
      res.status(404).send('Blog page not found')
    })
  }

  // SPA fallback: serve index.html for any route not matched above
  // Express v5 requires regex for catch-all routes instead of '*'
  if (runtimeConfig.nodeEnv === 'production') {
    const indexHtmlPath = path.join(__dirname, '../../front/build/index.html')

    app.get(/.*/u, (_req, res): void => {
      res.sendFile(indexHtmlPath)
    })
  }

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
