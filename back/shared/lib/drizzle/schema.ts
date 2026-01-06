/**
 * The schema.ts file is used by Drizzle Kit in drizzle.config.ts
 * Drizzle Kit requires a single entry point that exports all database table schemas so it can:
 * Generate migration, push schema changes
 */
export { bookmarksTable } from '@back/entities/bookmark/bookmarksTableSchema'
export { filesTable } from '@back/entities/file/filesTableSchema'
export { quotationsTable } from '@back/entities/quotation/quotationsTableSchema'
export { usersTable } from '@back/entities/user/usersTableSchema'
export { visitorsTable } from '@back/entities/visitor/visitorsTableSchema'
