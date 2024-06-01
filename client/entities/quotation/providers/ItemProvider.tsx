import { createContext, useContext, type ReactNode } from 'react'

type Context = {
  itemIndex: number
  itemId: string
}

type Props = Context & {
  children: ReactNode
}

const ItemContext = createContext<Context | null>(null)

export const ItemProvider = ({
  children,
  itemIndex,
  itemId,
}: Props): JSX.Element => {
  return (
    <ItemContext.Provider value={{ itemIndex, itemId }}>
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
