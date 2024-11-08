import { dispatch } from '@shared/lib/redux'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getBoqBlockFromStore } from '../getters/getBoqBlockFromStore'
import { quotationSlice } from '../quotationSlice'
import type { BoqColumnKey } from '@entities/quotation/consts/boqColumnKey'

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
  if (editorRef.current === null) return

  const boqBlock = getBoqBlockFromStore({ blockIndex })
  if (boqBlock === undefined) return

  const prevHtml = boqBlock.boq.column[boqColumnKey].html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(
    quotationSlice.actions.updateBoqColumnNameTextReducer({
      blockIndex,
      html,
      boqColumnKey,
    }),
  )
}
