import { createContext, useContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  rowIndex: number
}

type Context = {
  rowIndex: number
}

const RowIndexContext = createContext<Context | null>(null)

export const RowIndexProvider = ({ children, rowIndex }: Props): JSX.Element => {
  return (
    <RowIndexContext.Provider value={{ rowIndex }}>
      {children}
    </RowIndexContext.Provider>
  )
}

export const useRowIndex = (): Context => {
  const context = useContext(RowIndexContext)

  if (!context) {
    throw new Error('useRowIndex must be used within a RowIndexProvider')
  }

  return context
}
