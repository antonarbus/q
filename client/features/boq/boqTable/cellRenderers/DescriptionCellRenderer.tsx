import { Froala } from 'client/components/Froala'
import { saveBoqDescription } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
  node: {
    rowIndex?: number
  }
}

export const DescriptionCellRenderer = ({ index, node, ...rest }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  const rowIndex = node.rowIndex

  if (item.type !== 'boq') return null
  if (rowIndex === undefined) return null
  const { html } = item.boq.rows[rowIndex].description

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      saveFroalaReducer={saveBoqDescription}
      rowIndex={rowIndex}
      placeholder='Description, text, links, files, images...'
      additionalStyle={{
        textAlign: 'left',
      }}
    />
  )
}
