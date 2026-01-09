/**
 * The schema.ts file is used by Drizzle Kit in drizzle.config.ts
 * Drizzle Kit requires a single entry point that exports all database table schemas so it can:
 * Generate migration, push schema changes
 */
export { bookmarksTable } from '@back/entity/bookmark/db/bookmarksTableSchema'
export { filesTable } from '@back/entity/file/db/filesTableSchema'
export { quotationsTable } from '@back/entity/quotation/db/quotationsTableSchema'
export { usersTable } from '@back/entity/user/db/usersTableSchema'
export { visitorsTable } from '@back/entity/visitor/db/visitorsTableSchema'
