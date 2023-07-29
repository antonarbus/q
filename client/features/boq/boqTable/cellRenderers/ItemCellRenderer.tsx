import { Froala } from 'client/components/Froala'
import { saveBoqItem } from 'client/features/items/itemsSlice'
import { BoqItem } from 'client/features/items/types'
import { store } from 'client/store'
import { RefDiv, RefAny } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
  node: {
    rowIndex?: number
  }
}

export const ItemCellRenderer = ({ index, node, ...rest }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]
  const rowIndex = node.rowIndex
  if (item?.type !== 'boq') return null
  if (rowIndex === undefined) return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      getHtml={() => (store.getState().items?.[index] as BoqItem)?.boq?.rows[rowIndex]?.item?.html}
      saveFroalaReducer={saveBoqItem}
      rowIndex={rowIndex}
      placeholder='Item price...'
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
