import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { getBoqItemFromStore, itemsSlice } from '@entities/items'
import { dispatch } from '@shared/clients'
import { saveItemsLocally } from '@shared/lib'
import type { BoqColumnKey } from '@shared/types'

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
