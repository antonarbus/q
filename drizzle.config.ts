import { defineConfig } from 'drizzle-kit'
import { getDbUrl } from '@back/config/getDbUrl'

// https://neon.com/docs/guides/drizzle#configure-drizzle-kit

const dbUrl = await getDbUrl()

export default defineConfig({
  schema: './back/shared/lib/drizzle/schema.ts', // schema file path
  out: './drizzle', // migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
})
