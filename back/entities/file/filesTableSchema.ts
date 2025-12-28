import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { generateId } from '@root/shared/lib/nanoid'

export const filesTable = pgTable(
  'files',
  {
    id: varchar({ length: 8 })
      .primaryKey()
      .$defaultFn(() => generateId()),
    email: varchar({ length: 320 }).notNull(),
    uploadedAt: timestamp({ mode: 'string', withTimezone: true })
      .notNull()
      .defaultNow(),
    name: varchar({ length: 255 }).notNull(),
    size: integer().notNull().default(0),
  },
  (table) => [
    index('files_email_idx').on(table.email),
    index('files_id_idx').on(table.id),
  ],
)

export type SelectFile = typeof filesTable.$inferSelect
export type InsertFile = typeof filesTable.$inferInsert
