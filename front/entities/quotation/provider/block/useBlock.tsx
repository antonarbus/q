import { useContext } from 'react'
import { BlockContext } from './BlockContext'
import type { Res } from './types'

export const useBlock = (): Res => {
  const context = useContext(BlockContext)

  if (context === null) {
    throw new Error('useBlock must be used within a BlockProvider')
  }

  return context
}
