import { dispatch, getState } from '@lib_instances/store'
import { itemKey, itemsSlice } from '@entities/quotation'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updateTextItem = ({
  editorRef,
  itemIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== itemKey.text) return

  const prevHtml = item.text.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(itemsSlice.actions.updateItemTextReducer({ itemIndex, html }))
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
}
