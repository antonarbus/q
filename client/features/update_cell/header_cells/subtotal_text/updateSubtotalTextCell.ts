import { dispatch } from '@lib_instances/store'
import { saveItemsLocally, updateBoqHeaderCellAtStore } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'
import { navSlice } from '@entities/nav'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateSubtotalTextCell = ({ editorRef, itemIndex, boqHeaderKey }: Props): void => {
  const { didUpdate } = updateBoqHeaderCellAtStore({ editorRef, itemIndex, boqHeaderKey })

  if (didUpdate) {
    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
  }
}
