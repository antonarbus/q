import { date, integer, pgTable } from 'drizzle-orm/pg-core'

export const visitorsTable = pgTable('visitors', {
  visitedAt: date({ mode: 'date' }).primaryKey(),
  totalCount: integer().notNull().default(0),
  newCount: integer().notNull().default(0),
})

export type SelectVisitors = typeof visitorsTable.$inferSelect
export type InsertVisitors = typeof visitorsTable.$inferInsert
