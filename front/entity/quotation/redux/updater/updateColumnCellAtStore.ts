import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { dispatch } from '@shared/lib/redux'
import { getBoqBlockFromStore } from '../getter/getBoqBlockFromStore'
import { quotationSlice } from '../quotationSlice'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateColumnCellAtStore = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const prevHtml = boqBlock.boq.column[props.boqColumnKey].html
  const html = props.editorRef.current.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBoqColumnNameTextReducer({
      blockIndex: props.blockIndex,
      html,
      boqColumnKey: props.boqColumnKey,
    }),
  )
}
