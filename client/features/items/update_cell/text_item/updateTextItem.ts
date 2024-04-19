import { dispatch, getState } from '@lib_instances/store'
import { itemKey, quotationSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updateTextItem = ({
  editorRef,
  itemIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const item = getState().quotation.items[itemIndex]
  if (item?.type !== itemKey.text) return

  const prevHtml = item.text.html
  const html = editorRef.current.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(quotationSlice.actions.updateItemTextReducer({ itemIndex, html }))
  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
