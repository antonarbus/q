import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { runtimeConfig } from 'config/runtime'

// https://neon.com/docs/guides/drizzle#initialize-the-drizzle-client

// Database URL is automatically selected based on the environment
// (dev/test/pilot/prod) via runtimeConfig.database.url
const client = neon(runtimeConfig.database.url)
export const db = drizzle({ client })
