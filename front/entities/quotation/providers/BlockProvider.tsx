import { createContext, useContext, type ReactNode } from 'react'
import type { Block } from '../types'

type Context = {
  blockIndex: number
  id: string
  block: Block
}

type Props = Context & {
  children: ReactNode
}

const BlockContext = createContext<Context | null>(null)

export const BlockProvider = ({
  children,
  blockIndex,
  id,
  block,
}: Props): JSX.Element => {
  return (
    <BlockContext.Provider
      value={{
        blockIndex,
        id,
        block,
      }}
    >
      {children}
    </BlockContext.Provider>
  )
}

export const useBlock = (): Context => {
  const context = useContext(BlockContext)

  if (!context) {
    throw new Error('useBlock must be used within a BlockProvider')
  }

  return context
}
