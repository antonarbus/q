import { createContext, useContext, type ReactNode } from 'react'
import { type Item } from '../types'

type Context = {
  itemIndex: number
  itemId: string
  item: Item
}

type Props = Context & {
  children: ReactNode
}

const ItemContext = createContext<Context | null>(null)

export const ItemProvider = ({
  children,
  itemIndex,
  itemId,
  item,
}: Props): JSX.Element => {
  return (
    <ItemContext.Provider
      value={{
        itemIndex,
        itemId,
        item,
      }}
    >
      {children}
    </ItemContext.Provider>
  )
}

export const useItem = (): Context => {
  const context = useContext(ItemContext)

  if (!context) {
    throw new Error('useItem must be used within a ItemProvider')
  }

  return context
}
