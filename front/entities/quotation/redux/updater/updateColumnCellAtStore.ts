import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { reduxHolder } from '@front/shared/lib/redux'
import { getBoqBlockFromStoreByIndex } from '../getter/getBoqBlockFromStoreByIndex'
import { quotationSlice } from '../quotationSlice'
import type { Editor } from '@tiptap/react'

type Props = {
  editor: Editor | null
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateColumnCellAtStore = (props: Props): void => {
  if (props.editor === null) {
    return
  }

  const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const prevHtml = boqBlock.boq.column[props.boqColumnKey].html
  const html = props.editor.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updateBoqColumnNameText({
      blockIndex: props.blockIndex,
      html,
      boqColumnKey: props.boqColumnKey,
    }),
  )
}
