import type FroalaEditor from 'froala-editor'
import { createContext, useContext, type ReactNode } from 'react'
import { useBoqItem } from './BoqItemProvider'

type FroalaEditorRef = {
  current: FroalaEditor | null
}

type Context = {
  rowIndex: number
  rowId: string
  itemPriceCellEditorRef: FroalaEditorRef
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

type Props = Omit<Context, 'itemPriceCellEditorRef' | 'qtyCellEditorRef' | 'priceCellEditorRef'> & {
  children: ReactNode
}

const RowContext = createContext<Context | null>(null)

export const RowProvider = ({
  children,
  rowIndex,
  rowId,
}: Props): JSX.Element => {
  const { boqRowEditorRefs } = useBoqItem()

  const itemPriceCellEditorRef = { current: null }
  const qtyCellEditorRef = { current: null }
  const priceCellEditorRef = { current: null }

  boqRowEditorRefs[rowIndex] = {
    itemPrice: itemPriceCellEditorRef,
    qty: qtyCellEditorRef,
    price: priceCellEditorRef,
  }

  return (
    <RowContext.Provider
      value={{
        rowIndex,
        rowId,
        itemPriceCellEditorRef,
        qtyCellEditorRef,
        priceCellEditorRef,
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
