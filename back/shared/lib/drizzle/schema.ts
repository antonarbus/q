/**
 * The schema.ts file is used by Drizzle Kit in drizzle.config.ts
 * Drizzle Kit requires a single entry point that exports all database table schemas so it can:
 * Generate migration, push schema changes - When you run drizzle-kit generate, it needs to know about all tables to create migration files
 */
export { bookmarksTable } from '@back/entities/bookmark'
export { filesTable } from '@back/entities/file'
export { quotationsTable } from '@back/entities/quotation'
export { usersTable } from '@back/entities/user'
export { visitorsTable } from '@back/entities/visitor'
