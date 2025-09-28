import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  type JSX,
} from 'react'
import type { Item } from '../type'

type Context = {
  blockIndex: number
  block: Item
}

type Props = Context & {
  children: ReactNode
}

const BlockContext = createContext<Context | null>(null)

export const BlockProvider = ({
  children,
  blockIndex,
  block,
}: Props): JSX.Element => {
  const blockContextData = useMemo(() => {
    const contextData = {
      blockIndex,
      block,
    }

    return contextData
  }, [blockIndex, block])

  return (
    <BlockContext.Provider value={blockContextData}>
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
