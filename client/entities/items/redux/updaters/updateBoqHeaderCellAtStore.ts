import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { dispatch } from '@shared/clients'
import { getNumberFromString, getTextContentFromHtml } from '@shared/lib'
import { type BoqHeaderKey } from '@shared/types'
import { saveItemsLocally } from '../../utils/saveItemsLocally'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import { itemsSlice } from '../itemsSlice'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateBoqHeaderCellAtStore = ({
  editorRef,
  itemIndex,
  boqHeaderKey,
}: Props): void => {
  if (editorRef.current === null) return

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return

  const prevHtml = boqItem.boq.header[boqHeaderKey].html
  const html = editorRef.current?.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(itemsSlice.actions.updateBoqHeaderTextReducer({
    itemIndex,
    html,
    value: cellValueFromHtml,
    boqHeaderKey,
  }))

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
