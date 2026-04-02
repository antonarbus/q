import { useContext } from 'react'
import { TiptapContext } from './TiptapContext'
import type { Res } from './types'

export const useTiptapCtx = (): Res => {
  const context = useContext(TiptapContext)

  if (context === null) {
    throw new Error('useTiptapCtx must be used within a TiptapProvider')
  }

  return context
}
