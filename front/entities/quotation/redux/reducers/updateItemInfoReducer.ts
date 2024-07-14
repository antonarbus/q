import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getItemFromState } from '../getters/getItemFromState'

export const updateItemInfoReducer = (
  state: Quotation,
  action: PayloadAction<{
    id: string
    name: string | undefined
    category: string | undefined
    desc: string | undefined
    info: string | undefined
  }>,
): void => {
  const { id, name, category, desc, info } = action.payload

  const item = getItemFromState({ id, state })

  if (item === undefined) return

  item.name = name
  item.category = category
  item.desc = desc
  item.info = info
}
