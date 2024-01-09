import { getBoqHeaderHtmlFromStore, useItem, Froala } from 'client/entities/items'
import { updateBoqHeaderCell } from 'client/features/update_cell'
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
        updateBoqHeaderCell({
          html: editorRef.current?.html.get() ?? '',
          itemIndex,
          boqHeaderKey,
        })
      }}
      additionalStyle={{
        flexGrow: 1,
        minHeight: '24px',
      }}
    />
  )
}
