import { date, integer, pgTable } from 'drizzle-orm/pg-core'

export const visitorsTable = pgTable('visitors', {
  date: date({ mode: 'date' }).primaryKey(),
  count: integer().notNull().default(0),
  new: integer().notNull().default(0),
})

export type SelectVisitors = typeof visitorsTable.$inferSelect
export type InsertVisitors = typeof visitorsTable.$inferInsert
