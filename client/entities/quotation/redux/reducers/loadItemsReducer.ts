import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../../types'

type Payload = {
  items: Item[]
}

type Reducer = (state: Item[], action: PayloadAction<Payload>) => Item[]

export const loadItemsReducer: Reducer = (state, action) => {
  const { items } = action.payload
  return items
}
