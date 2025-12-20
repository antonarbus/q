import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { secret } from 'config/secrets'

// https://neon.com/docs/guides/drizzle

const client = neon(secret.NEON_DATABASE_URL)
export const db = drizzle({ client })
