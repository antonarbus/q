import { index, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { generateId } from '@back/shared/lib/nanoid'

export const bookmarkTypeEnum = pgEnum('bookmark_type', [
  'boq',
  'text',
  'price',
  'row',
  'paste',
])

export const bookmarksTable = pgTable(
  'bookmarks',
  {
    id: varchar({ length: 8 })
      .primaryKey()
      .$defaultFn(() => generateId()),
    email: varchar({ length: 320 }).notNull(),
    type: bookmarkTypeEnum().notNull(),
    name: varchar({ length: 255 }).notNull().default(''),
    category: varchar({ length: 100 }).notNull().default(''),
    desc: varchar({ length: 2000 }).notNull().default(''),
    createdAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  },
  (table) => [index('email_idx').on(table.email)],
)

export type SelectBookmark = typeof bookmarksTable.$inferSelect
export type InsertBookmark = typeof bookmarksTable.$inferInsert
