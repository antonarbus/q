import { defineConfig } from 'drizzle-kit'
import { getDbUrl } from '@back/config/getDbUrl'

// https://neon.com/docs/guides/drizzle#configure-drizzle-kit

const dbUrl = await getDbUrl()

const drizzleConfig = defineConfig({
  // schema file path
  schema: './back/shared/lib/drizzle/schema.ts',
  // migrations folder
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
})

// oxlint-disable-next-line import/no-default-export
export default drizzleConfig
