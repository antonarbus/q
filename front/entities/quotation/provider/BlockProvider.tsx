import {
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import type { BlockItem } from '@back/entities/quotation/quotationSchema'

type Res = {
  index: number
  item: BlockItem
}

type Props = Res & {
  children: ReactNode
}

const BlockContext: Context<Res | null> = createContext<Res | null>(null)

export const BlockProvider = (props: Props): JSX.Element => {
  const blockContextData = useMemo(() => {
    const contextData = {
      index: props.index,
      item: props.item,
    }

    return contextData
  }, [props.index, props.item])

  return (
    <BlockContext.Provider value={blockContextData}>
      {props.children}
    </BlockContext.Provider>
  )
}

export const useBlock = (): Res => {
  const context = useContext(BlockContext)

  if (context === null) {
    throw new Error('useBlock must be used within a BlockProvider')
  }

  return context
}
