import { createContext, useContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  rowIndex: number
  rowId: string
}

type Context = {
  rowIndex: number
  rowId: string
}

const RowContext = createContext<Context | null>(null)

export const RowProvider = ({ children, rowIndex, rowId }: Props): JSX.Element => {
  return (
    <RowContext.Provider value={{ rowIndex, rowId }}>
      {children}
    </RowContext.Provider>
  )
}

export const useRow = (): Context => {
  const context = useContext(RowContext)

  if (!context) {
    throw new Error('useRowIndex must be used within a RowIndexProvider')
  }

  return context
}
