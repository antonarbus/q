import { useContext } from 'react'
import { RowContext } from './RowContext'
import type { Res } from './types'

export const useRow = (): Res => {
  const context = useContext(RowContext)

  if (context === null) {
    throw new Error('useRow must be used within a RowProvider')
  }

  return context
}
