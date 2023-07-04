import { Froala } from 'client/components/Froala'
import { saveBoqPrice } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
  node: {
    rowIndex?: number
  }
}

export const PriceCellRenderer = ({ index, node, ...rest }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef(null) as TRefAny
  const item = store.getState().items?.[index]
  const rowIndex = node.rowIndex

  if (item.type !== 'boq') return null
  if (rowIndex === undefined) return null
  const { html, height } = item.boq.rows[rowIndex].price

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      height={height}
      saveFroalaReducer={saveBoqPrice}
      rowIndex={rowIndex}
      placeholder='Total price...'
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
