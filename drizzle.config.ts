import { defineConfig } from 'drizzle-kit'
import { getDbUrl } from '@back/config/getDbUrl'

// https://neon.com/docs/guides/drizzle#configure-drizzle-kit

const dbUrl = await getDbUrl()

export default defineConfig({
  // schema file path
  schema: './back/shared/lib/drizzle/schema.ts',
  // migrations folder
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
})
