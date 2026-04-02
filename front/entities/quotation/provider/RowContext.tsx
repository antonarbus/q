import { createContext } from 'react'
import type { Res } from './types'

export const RowContext: React.Context<Res | null> = createContext<Res | null>(null)
