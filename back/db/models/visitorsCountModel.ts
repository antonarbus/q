import { model, Schema } from 'mongoose'

export type VisitorsCount = {
  date: string
  count: number
  new: number
}

const visitorsCountSchema = new Schema<VisitorsCount>({
  date: {
    type: String, // 'YYYY-MM-DD'
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  new: {
    type: Number,
    default: 0,
  },
})

export const VisitorsCountModel = model<VisitorsCount>(
  'visitor',
  visitorsCountSchema,
)
