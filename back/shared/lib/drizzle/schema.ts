/**
 * The schema.ts file is used by Drizzle Kit in drizzle.config.ts
 * Drizzle Kit requires a single entry point that exports all database table schemas so it can:
 * Generate migration, push schema changes
 *
 * Drizzle Kit has an issue with path aliases, so use relative paths
 */
export { bookmarksTable } from '../../../entity/bookmark/db/bookmarksTableSchema'
export { filesTable } from '../../../entity/file/db/filesTableSchema'
export { quotationsTable } from '../../../entity/quotation/db/quotationsTableSchema'
export { usersTable } from '../../../entity/user/db/usersTableSchema'
export { visitorsTable } from '../../../entity/visitor/db/visitorsTableSchema'
