import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { getDbUrl } from '@back/config/getDbUrl'

// https://neon.com/docs/guides/drizzle#initialize-the-drizzle-client

// Database URL is automatically selected based on the environment
// (dev/test/pilot/prod) via databaseConfig.url
const dbUrl = await getDbUrl()

const client = neon(dbUrl)

export const db = drizzle({ client })
