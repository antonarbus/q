import { getBoqHeaderHtmlFromStore, useItem, Froala, updateBoqHeaderCellAtStore, titleCellStyle } from 'client/entities/items'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqHeaderKey } from 'client/shared/types'

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
        updateBoqHeaderCellAtStore({
          html: editorRef.current?.html.get() ?? '',
          itemIndex,
          boqHeaderKey,
        })
      }}
      additionalStyle={titleCellStyle}
    />
  )
}
