import { Froala } from 'client/components/Froala'
import { saveBoqQty } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, RefAny } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
  node: {
    rowIndex?: number
  }
}

export const QtyCellRenderer = ({ index, node, ...rest }: Props) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]
  const rowIndex = node.rowIndex

  if (item.type !== 'boq') return null
  if (rowIndex === undefined) return null
  const { html } = item.boq.rows[rowIndex].qty

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      saveFroalaReducer={saveBoqQty}
      rowIndex={rowIndex}
      placeholder='Qty...'
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
