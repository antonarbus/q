import { getBoqHeaderHtmlFromStore, useItem, Froala, updateBoqHeaderCellAtStore, subTotalTextCellStyle } from 'client/entities/items'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqHeaderKey } from 'client/shared/types'

const boqHeaderKey: BoqHeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  // todo: if we want to re-calculate items rows prices and visually show it
  // todo: we need to have froalaEditors on this level, but we do not have
  // todo: maybe we just simply make updates in the store and refresh the table
  // todo: but better create a ref on this level and put there all editor references in array with length of boq rows

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Subtotal...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        updateBoqHeaderCellAtStore({
          html: editorRef.current?.html.get() ?? '',
          itemIndex,
          boqHeaderKey,
        })
      }}
      additionalStyle={subTotalTextCellStyle}
    />
  )
}
