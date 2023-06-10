import { Froala } from 'client/components/Froala'
import { saveBoqDescriptionHtml } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const DescriptionCellRenderer = ({ index, node, ...rest }: TProps) => {
  // console.log({ index, rest })
  // console.log('DescriptionCellRenderer index', index)
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  const rowIndex = node.rowIndex

  if (item.type !== 'boq') return null
  const html = item.boq.rows[rowIndex].description.html

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      saveHtmlReducer={saveBoqDescriptionHtml}
      rowIndex={rowIndex}
      placeholder='Description, text, links, files, images...'
      sx={{ flexGrow: 1 }}
    />
  )
}
