import { dispatch } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { getBoqBlockFromStore } from '../getter/getBoqBlockFromStore'
import { quotationSlice } from '../quotationSlice'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqHeaderAtStore = (props: Props): Res => {
  if (props.editorRef.current === null) {
    return { didUpdate: false }
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return { didUpdate: false }
  }

  const prevHtml = boqBlock.boq.header[props.boqHeaderKey].html
  const html = props.editorRef.current.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return { didUpdate: false }
  }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(
    quotationSlice.actions.updateBoqHeaderText({
      blockIndex: props.blockIndex,
      html,
      value: cellValueFromHtml,
      boqHeaderKey: props.boqHeaderKey,
    }),
  )

  return { didUpdate: true }
}
