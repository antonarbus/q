import { dispatch } from '@lib_instances/store'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'
import type { HeaderKey } from '../../types'
import { getBoqBlockFromStore } from '../getters/getBoqBlockFromStore'
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
  if (editorRef.current === null) return { didUpdate: false }

  const boqBlock = getBoqBlockFromStore({ blockIndex })
  if (boqBlock === undefined) return { didUpdate: false }

  const prevHtml = boqBlock.boq.header[boqHeaderKey].html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return { didUpdate: false }

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
