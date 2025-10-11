import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch } from '@shared/lib/redux'
import { getBoqBlockFromStore } from '../getter/getBoqBlockFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqColumnCellAtStore = ({
  editorRef,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  if (editorRef.current === null) {
    return
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const prevHtml = boqBlock.boq.column[boqColumnKey].html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBoqColumnNameTextReducer({
      blockIndex,
      html,
      boqColumnKey,
    }),
  )
}
