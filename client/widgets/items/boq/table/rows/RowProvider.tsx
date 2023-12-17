import { createContext, useContext, type ReactNode } from 'react'

type Context = {
  rowIndex: number
  rowId: string
}

type Props = Context & {
  children: ReactNode

}

const RowContext = createContext<Context | null>(null)

export const RowProvider = ({
  children,
  rowIndex,
  rowId,
}: Props): JSX.Element => {
  return (
    <RowContext.Provider
      value={{
        rowIndex,
        rowId,
      }}
    >
      {children}
    </RowContext.Provider>
  )
}

export const useRow = (): Context => {
  const context = useContext(RowContext)

  if (!context) {
    throw new Error('useRow must be used within a RowProvider')
  }

  return context
}
