import { Froala } from 'client/components/Froala'
import { saveBoqItem } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
  node: {
    rowIndex?: number
  }
}

export const ItemCellRenderer = ({ index, node, ...rest }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  const rowIndex = node.rowIndex

  if (item.type !== 'boq') return null
  if (rowIndex === undefined) return null
  const { html, height } = item.boq.rows[rowIndex].item

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      height={height}
      saveFroalaReducer={saveBoqItem}
      rowIndex={rowIndex}
      placeholder='Item price...'
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
