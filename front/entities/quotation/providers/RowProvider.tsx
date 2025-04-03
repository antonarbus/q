import { createContext, useContext, useMemo } from 'react'
import type { FroalaEditorRef } from '@shared/types/froala'
import { useBoq } from './BoqBlockProvider'
import type { Row } from '../types'

type Props = {
  rowIndex: number
  row: Row
  children: React.ReactNode
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
  row,
}: Props): React.JSX.Element => {
  const { boqRowEditorRefs } = useBoq()

  const {
    descriptionEditorRef,
    itemPriceCellEditorRef,
    qtyCellEditorRef,
    priceCellEditorRef,
  } = useMemo(() => {
    return {
      descriptionEditorRef: { current: null },
      itemPriceCellEditorRef: { current: null },
      qtyCellEditorRef: { current: null },
      priceCellEditorRef: { current: null },
    }
  }, [])

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
        row,
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
