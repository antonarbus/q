import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { generateId } from '@back/shared/lib/nanoid'

export const bookmarksTable = pgTable('bookmarks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  email: text('email').notNull(),
  type: text('type'),
  name: text('name'),
  category: text('category'),
  desc: text('desc'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
}, (table) => [
  index('email_idx').on(table.email),
])

export type SelectBookmark = typeof bookmarksTable.$inferSelect
export type InsertBookmark = typeof bookmarksTable.$inferInsert
