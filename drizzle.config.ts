import { defineConfig } from 'drizzle-kit'
import { runtimeConfig } from '@root/config/runtime'

// https://neon.com/docs/guides/drizzle#configure-drizzle-kit

export default defineConfig({
  schema: './back/shared/lib/drizzle/schema.ts', // schema file path
  out: './drizzle', // migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: runtimeConfig.database.url,
  },
})
