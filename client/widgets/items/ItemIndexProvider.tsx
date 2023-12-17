import { createContext, useContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  itemIndex: number
}

type Context = {
  itemIndex: number
}

const ItemIndexContext = createContext<Context | null>(null)

export const ItemIndexProvider = ({ children, itemIndex }: Props): JSX.Element => {
  return (
    <ItemIndexContext.Provider value={{ itemIndex }}>
      {children}
    </ItemIndexContext.Provider>
  )
}

export const useItemIndex = (): Context => {
  const context = useContext(ItemIndexContext)

  if (!context) {
    throw new Error('useItemIdex must be used within a ItemIdexProvider')
  }

  return context
}
