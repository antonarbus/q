import { getBoqHeaderHtmlFromStore, useItem, Froala, titleCellStyle } from 'client/entities/items'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqHeaderKey } from 'client/shared/types'
import { updateTitleCell } from 'client/features/update_cell'

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
      additionalStyle={titleCellStyle}
    />
  )
}
