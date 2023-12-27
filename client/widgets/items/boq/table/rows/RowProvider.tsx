import { createContext, useContext, type ReactNode } from 'react'
import type FroalaEditor from 'froala-editor'

type FroalaEditorRef = {
  current: FroalaEditor | null
}

type Context = {
  rowIndex: number
  rowId: string
  itemCellEditorRef: FroalaEditorRef
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

type Props = Omit<Context, 'itemCellEditorRef' | 'qtyCellEditorRef' | 'priceCellEditorRef'> & {
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
        itemCellEditorRef: { current: null },
        qtyCellEditorRef: { current: null },
        priceCellEditorRef: { current: null },
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
