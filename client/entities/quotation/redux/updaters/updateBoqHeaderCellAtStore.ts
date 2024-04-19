import { dispatch } from '@lib_instances/store'
import { type FroalaEditorRef } from '@shared/types/froala'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'
import { type BoqHeaderKey } from '../../types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import { quotationSlice } from '../quotationSlice'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqHeaderCellAtStore = ({
  editorRef,
  itemIndex,
  boqHeaderKey,
}: Props): Res => {
  if (editorRef.current === null) return { didUpdate: false }

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return { didUpdate: false }

  const prevHtml = boqItem.boq.header[boqHeaderKey].html
  const html = editorRef.current?.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return { didUpdate: false }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(quotationSlice.actions.updateBoqHeaderTextReducer({
    itemIndex,
    html,
    value: cellValueFromHtml,
    boqHeaderKey,
  }))

  return { didUpdate: true }
}
