import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { dispatch } from '@shared/clients'
import type { BoqColumnKey } from '@shared/types'
import { saveItemsLocally } from '../../utils/saveItemsLocally'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import { itemsSlice } from '../itemsSlice'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqColumnCellAtStore = ({
  editorRef,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  if (editorRef.current === null) return

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return

  const prevHtml = boqItem.boq.column[boqColumnKey].html
  const html = editorRef.current?.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(itemsSlice.actions.updateBoqColumnNameTextReducer({ itemIndex, html, boqColumnKey }))
  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
