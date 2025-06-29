import { dispatch } from '@shared/lib/redux'
import type { FroalaEditorRef } from '@shared/type/froala'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import type { HeaderKey } from '../../type'
import { getBoqBlockFromStore } from '../getter/getBoqBlockFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
  boqHeaderKey: HeaderKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqHeaderCellAtStore = ({
  editorRef,
  blockIndex,
  boqHeaderKey,
}: Props): Res => {
  if (editorRef.current === null) {
    return { didUpdate: false }
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return { didUpdate: false }
  }

  const prevHtml = boqBlock.boq.header[boqHeaderKey].html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return { didUpdate: false }
  }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(
    quotationSlice.actions.updateBoqHeaderTextReducer({
      blockIndex,
      html,
      value: cellValueFromHtml,
      boqHeaderKey,
    }),
  )

  return { didUpdate: true }
}
