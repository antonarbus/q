/**
 * The schema.ts file is used by Drizzle Kit in drizzle.config.ts
 * Drizzle Kit requires a single entry point that exports all database table schemas so it can:
 * Generate migration, push schema changes
 */
export { bookmarksTable } from '@back/entities/bookmark/db/bookmarksTableSchema'
export { filesTable } from '@back/entities/file/db/filesTableSchema'
export { quotationsTable } from '@back/entities/quotation/db/quotationsTableSchema'
export { usersTable } from '@back/entities/user/db/usersTableSchema'
export { visitorsTable } from '@back/entities/visitor/db/visitorsTableSchema'
