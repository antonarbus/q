import { dispatch } from '@lib_instances/store'
import { updateBoqHeaderCellAtStore } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateTitleCell = ({ editorRef, itemIndex, boqHeaderKey }: Props): void => {
  const { didUpdate } = updateBoqHeaderCellAtStore({ editorRef, itemIndex, boqHeaderKey })

  if (didUpdate) {
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
  }
}
