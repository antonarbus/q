import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { generateId } from '@root/shared/lib/nanoid'

export const bookmarksTable = pgTable(
  'bookmarks',
  {
    id: varchar({ length: 8 })
      .primaryKey()
      .$defaultFn(() => generateId()),
    email: varchar({ length: 320 }).notNull(),
    type: varchar({
      length: 128,
      enum: ['boq', 'text', 'price', 'row', 'paste'],
    }).notNull(),
    name: varchar({ length: 255 }).notNull().default(''),
    category: varchar({ length: 100 }).notNull().default(''),
    desc: varchar({ length: 2000 }).notNull().default(''),
    createdAt: timestamp({ mode: 'string', withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: 'string', withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('email_idx').on(table.email)],
)

export type SelectBookmark = typeof bookmarksTable.$inferSelect
// export type InsertBookmark = typeof bookmarksTable.$inferInsert
