import { defineConfig } from 'drizzle-kit'
import { secret } from 'config/secrets'

// https://neon.com/docs/guides/drizzle#configure-drizzle-kit

export default defineConfig({
  schema: './back/shared/lib/drizzle/schema.ts', // schema file path
  out: './drizzle', // migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: secret.NEON_DATABASE_URL,
  },
})
