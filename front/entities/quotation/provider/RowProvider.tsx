import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import {
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import type { RowBlock } from '../types/BlockItem'
import { useBoq } from './BoqBlockProvider'

type Props = {
  index: number
  item: RowBlock
  children: ReactNode
}

type Res = Omit<Props, 'children'> & {
  descriptionCellEditorRef: FroalaEditorRef
  itemPriceCellEditorRef: FroalaEditorRef
  qtyCellEditorRef: FroalaEditorRef
  priceCellEditorRef: FroalaEditorRef
}

const RowContext: Context<Res | null> = createContext<Res | null>(null)

export const RowProvider = (props: Props): JSX.Element => {
  const boq = useBoq()

  const rowEditorRef = useMemo(() => {
    return {
      descriptionCellEditorRef: { current: null },
      itemPriceCellEditorRef: { current: null },
      qtyCellEditorRef: { current: null },
      priceCellEditorRef: { current: null },
    }
  }, [])

  boq.rowEditorRefs[props.index] = {
    description: rowEditorRef.descriptionCellEditorRef,
    itemPrice: rowEditorRef.itemPriceCellEditorRef,
    qty: rowEditorRef.qtyCellEditorRef,
    price: rowEditorRef.priceCellEditorRef,
  }

  const rowContextData = useMemo(() => {
    const context = {
      index: props.index,
      item: props.item,
      descriptionCellEditorRef: rowEditorRef.descriptionCellEditorRef,
      itemPriceCellEditorRef: rowEditorRef.itemPriceCellEditorRef,
      qtyCellEditorRef: rowEditorRef.qtyCellEditorRef,
      priceCellEditorRef: rowEditorRef.priceCellEditorRef,
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
