import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'

export const addFileInfoReducer = (
  state: Quotation,
  action: PayloadAction<{
    fileName: string
    fileSize: number
    fileUploadedAt: Date
  }>,
): void => {
  const file = action.payload
  const files = [...(state.files ?? []), file]
  state.files = files
}
