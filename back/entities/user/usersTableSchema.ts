import {
  boolean,
  index,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable(
  'users',
  {
    email: varchar({ length: 320 }).primaryKey(),
    password: varchar({ length: 255 }).notNull(),
    roles: varchar({ length: 50, enum: ['user', 'super-admin'] })
      .array()
      .notNull()
      .default(['user']),
    isActivated: boolean().notNull().default(false),
    activationKey: varchar({ length: 255 }),
    resetPasswordKey: varchar({ length: 255 }),
    refreshJwtToken: varchar({ length: 500 }),
    registeredAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
    loggedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  },
  (table) => [index('users_email_idx').on(table.email)],
)

export type SelectUser = typeof usersTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert
