import { createContext, useContext } from 'react'
import type { Item } from '../types'

type Context = {
  blockIndex: number
  block: Item
}

type Props = Context & {
  children: React.ReactNode
}

const BlockContext = createContext<Context | null>(null)

export const BlockProvider = ({
  children,
  blockIndex,
  block,
}: Props): React.JSX.Element => {
  return (
    <BlockContext.Provider
      value={{
        blockIndex,
        block,
      }}
    >
      {children}
    </BlockContext.Provider>
  )
}

export const useBlock = (): Context => {
  const context = useContext(BlockContext)

  if (context === null) {
    throw new Error('useBlock must be used within a BlockProvider')
  }

  return context
}
