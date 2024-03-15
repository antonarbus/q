import { dispatch } from '@lib_instances/store'
import { navSlice } from '@entities/nav'
import { type FroalaEditorRef } from '@shared/types'
import type { BoqColumnKey } from '../../types'
import { saveItemsLocally } from '../../utils/saveItemsLocally'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import { itemsSlice } from '../itemsSlice'

type Props = {
  editorRef: FroalaEditorRef
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
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
}
