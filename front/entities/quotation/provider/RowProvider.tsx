import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import {
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import type { Row } from '../type'
import { useBoq } from './BoqBlockProvider'

type Props = {
  rowIndex: number
  row: Row
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
  row,
}: Props): JSX.Element => {
  const { boqRowEditorRefs } = useBoq()

  const rowCellEditorRef = useMemo(() => {
    return {
      descriptionEditorRef: { current: null },
      itemPriceCellEditorRef: { current: null },
      qtyCellEditorRef: { current: null },
      priceCellEditorRef: { current: null },
    }
  }, [])

  boqRowEditorRefs[rowIndex] = {
    description: rowCellEditorRef.descriptionEditorRef,
    itemPrice: rowCellEditorRef.itemPriceCellEditorRef,
    qty: rowCellEditorRef.qtyCellEditorRef,
    price: rowCellEditorRef.priceCellEditorRef,
  }

  const rowContextData = useMemo(() => {
    const context = {
      rowIndex,
      row,
      descriptionEditorRef: rowCellEditorRef.descriptionEditorRef,
      itemPriceCellEditorRef: rowCellEditorRef.itemPriceCellEditorRef,
      qtyCellEditorRef: rowCellEditorRef.qtyCellEditorRef,
      priceCellEditorRef: rowCellEditorRef.priceCellEditorRef,
    }

    return context
  }, [rowIndex, row, boqRowEditorRefs])

  return (
    <RowContext.Provider value={rowContextData}>{children}</RowContext.Provider>
  )
}

export const useRow = (): Context => {
  const context = useContext(RowContext)

  if (context === null) {
    throw new Error('useRow must be used within a RowProvider')
  }

  return context
}
