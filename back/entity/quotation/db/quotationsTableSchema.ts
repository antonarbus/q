import { index, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const quotationsTable = pgTable(
  'quotations',
  {
    id: varchar({ length: 8 })
      .primaryKey()
      .$defaultFn(() => nanoid(8)),
    email: varchar({ length: 320 }).notNull(),
    name: varchar({ length: 255 }).notNull().default(''),
    category: varchar({ length: 100 }).notNull().default(''),
    desc: varchar({ length: 2000 }).notNull().default(''),
    createdAt: timestamp({ mode: 'string', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ mode: 'string', withTimezone: true }).notNull().defaultNow(),
    openedAt: timestamp({ mode: 'string', withTimezone: true }),
    viewedAt: timestamp({ mode: 'string', withTimezone: true }),
    access: jsonb()
      .notNull()
      .$type<{
        level: 'everyone' | 'nobody' | 'custom'
        userList: string[]
      }>()
      .default({ level: 'nobody', userList: [] }),
    paidAt: timestamp({ mode: 'string', withTimezone: true }),
  },
  (table) => [
    index('quotations_email_idx').on(table.email),
    index('quotations_id_idx').on(table.id),
  ],
)

export type SelectQuotation = typeof quotationsTable.$inferSelect
// export type InsertQuotation = typeof quotationsTable.$inferInsert
