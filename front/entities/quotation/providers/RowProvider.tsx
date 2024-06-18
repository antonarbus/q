import { createContext, useContext, type ReactNode } from 'react'
import { type FroalaEditorRef } from '@shared/types/froala'
import { useBoqItem } from './BoqItemProvider'

type Props = {
  rowIndex: number
  rowId: string
  children: ReactNode
}

type Context = Omit<Props, 'children'> & {
  descriptionEditorRef: FroalaEditorRef
  itemPriceCellEditorRef: FroalaEditorRef
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

const RowContext = createContext<Context | null>(null)

export const RowProvider = ({
  children,
  rowIndex,
  rowId,
}: Props): JSX.Element => {
  const { boqRowEditorRefs } = useBoqItem()

  const descriptionEditorRef = { current: null }
  const itemPriceCellEditorRef = { current: null }
  const qtyCellEditorRef = { current: null }
  const priceCellEditorRef = { current: null }

  boqRowEditorRefs[rowIndex] = {
    description: descriptionEditorRef,
    itemPrice: itemPriceCellEditorRef,
    qty: qtyCellEditorRef,
    price: priceCellEditorRef,
  }

  return (
    <RowContext.Provider
      value={{
        rowIndex,
        rowId,
        descriptionEditorRef,
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
