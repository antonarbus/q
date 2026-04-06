import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'node:path'
import url from 'node:url'
import { runtimeConfig } from '@root/config/runtime'
import { api } from '@back/api'
import { errorHandlerMiddleware } from '@back/shared/errors/errorHandlerMiddleware'
import { httpHandler } from '@back/shared/lib/express/httpHandler'
import blog404Html from './static/blog-404.html'
import { log } from './shared/util/log'

const thisDirPathAbsolute = path.dirname(url.fileURLToPath(import.meta.url))

// In bundled production (back/build/), go up 2 levels to reach /app/
// In development (back/), go up 1 level to reach project root
const rootPathAbsolute =
  runtimeConfig.nodeEnv === 'production'
    ? path.resolve(thisDirPathAbsolute, '..', '..')
    : path.resolve(thisDirPathAbsolute, '..')

const app = express()

// gzip compression for responses
app.use(compression())
// http logs in terminal
app.use(morgan('dev'))
// Stripe webhook needs raw body for signature verification — must be registered before express.json()
// If Express's JSON middleware runs first, it parses the body into a JS
// object and the original bytes are gone, making signature verification fail
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }))
// parses JSON payload and adds it to req.body
app.use(express.json({ limit: '50mb' }))
// parses Cookie header and adds to req.cookies
app.use(cookieParser())

// Serve bundled React static files in production (JS, CSS, images, etc.)
if (runtimeConfig.nodeEnv === 'production') {
  const frontendBuildPath = path.join(rootPathAbsolute, 'front', 'build')

  app.use(
    express.static(frontendBuildPath, {
      // Serve index.html for root '/' path
      index: 'index.html',
      // Cache hashed assets (JS, CSS, images) for 1 year
      maxAge: '1y',
      setHeaders: (res, filepath) => {
        // Overwrite cache settings for files that should NOT be cached (no hash in filename)
        const noCacheFileList = [
          // Entry point - references change on every deploy
          'index.html',
          // Global CSS without content hash
          'styles.css',
          // Updates when site structure changes
          'sitemap.xml',
          // Updates when site structure changes
          'robots.txt',
        ]

        // Don't cache files without hashes at file names added by bundler OR blog files
        const shouldNotCache =
          noCacheFileList.some((file) => filepath.endsWith(file)) || filepath.includes('/blog/')

        if (shouldNotCache === true) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')

          // HTTP 1.0 compatibility
          res.setHeader('Pragma', 'no-cache')
          // Proxies
          res.setHeader('Expires', '0')
        }
      },
    }),
  )
}

const apiList = Object.entries(api)

// Register API routes
apiList.forEach(([_key, item]) => {
  // Skip root '/' route in production - frontend serves index.html there
  const isProductionRootRoute = runtimeConfig.nodeEnv === 'production' && item.path === '/'

  if (isProductionRootRoute === true) {
    return
  }

  app[item.method](item.path, httpHandler(item.handler))
})

// Blog routes (static HTML blog, separate from React SPA)
if (runtimeConfig.nodeEnv === 'production') {
  // Redirect /blog to /blog/ for consistent URLs, otherwise React tries to render it
  app.get('/blog', (_req, res) => {
    res.redirect(301, '/blog/')
  })

  // Any /blog/* route that wasn't served by express.static should return 404
  // This prevents non-existent blog pages from falling through to React SPA
  app.get(/^\/blog\/.*/u, (_req, res) => {
    res.status(404).send(blog404Html)
  })
}

// SPA fallback: serve index.html for any route not matched above
if (runtimeConfig.nodeEnv === 'production') {
  const indexHtmlPath = path.join(rootPathAbsolute, 'front', 'build', 'index.html')

  app.get(/.*/u, (_req, res): void => {
    // Don't cache index.html (same reason as above in express.static)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.sendFile(indexHtmlPath)
  })
}

app.use(errorHandlerMiddleware)

app.listen(runtimeConfig.back.port, () => {
  log.info(`
      Backend server started 🚀
      URL: ${runtimeConfig.back.baseUrl}
      NODE_ENV: ${runtimeConfig.nodeEnv}
      Environment: ${runtimeConfig.environment}
      CI/CD pipeline: ${runtimeConfig.ci}
    `)
})
