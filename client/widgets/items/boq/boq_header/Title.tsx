import { useRef } from 'react'
import { updateTitleCell } from '@features/items/update_cell'
import { getBoqHeaderHtmlFromStore, useItem, Froala, titleCellStyle } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'
import { type FroalaEditor } from '@shared/types'

const boqHeaderKey: BoqHeaderKey = 'title'

export const Title = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Title...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        updateTitleCell({ editorRef, itemIndex, boqHeaderKey })
      }}
      style={titleCellStyle}
    />
  )
}
