import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import {
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import type { Row } from '../type'
import { useBoq } from './BoqBlockProvider'

type Props = {
  index: number
  item: Row
  children: ReactNode
}

type Res = Omit<Props, 'children'> & {
  descriptionEditorRef: FroalaEditorRef
  itemPriceCellEditorRef: FroalaEditorRef
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

const RowContext: Context<Res | null> = createContext<Res | null>(null)

export const RowProvider = (props: Props): JSX.Element => {
  const boq = useBoq()

  const rowCellEditorRef = useMemo(() => {
    return {
      descriptionEditorRef: { current: null },
      itemPriceCellEditorRef: { current: null },
      qtyCellEditorRef: { current: null },
      priceCellEditorRef: { current: null },
    }
  }, [])

  boq.rowEditorRefs[props.index] = {
    description: rowCellEditorRef.descriptionEditorRef,
    itemPrice: rowCellEditorRef.itemPriceCellEditorRef,
    qty: rowCellEditorRef.qtyCellEditorRef,
    price: rowCellEditorRef.priceCellEditorRef,
  }

  const rowContextData = useMemo(() => {
    const context = {
      index: props.index,
      item: props.item,
      descriptionEditorRef: rowCellEditorRef.descriptionEditorRef,
      itemPriceCellEditorRef: rowCellEditorRef.itemPriceCellEditorRef,
      qtyCellEditorRef: rowCellEditorRef.qtyCellEditorRef,
      priceCellEditorRef: rowCellEditorRef.priceCellEditorRef,
    }

    return context
  }, [props.index, props.item, boq.rowEditorRefs])

  return (
    <RowContext.Provider value={rowContextData}>
      {props.children}
    </RowContext.Provider>
  )
}

export const useRow = (): Res => {
  const context = useContext(RowContext)

  if (context === null) {
    throw new Error('useRow must be used within a RowProvider')
  }

  return context
}
