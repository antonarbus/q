import { createContext, useContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  itemIndex: number
}

type Context = {
  itemIndex: number
}

const ItemContext = createContext<Context | null>(null)

export const ItemProvider = ({ children, itemIndex }: Props): JSX.Element => {
  return (
    <ItemContext.Provider value={{ itemIndex }}>
      {children}
    </ItemContext.Provider>
  )
}

export const useItem = (): Context => {
  const context = useContext(ItemContext)

  if (!context) {
    throw new Error('useItemIdex must be used within a ItemIdexProvider')
  }

  return context
}
