import { dispatch } from '@lib_instances/store'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types'
import type { BoqColumnKey } from '../../types'
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
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
}
