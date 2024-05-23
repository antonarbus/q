import { dispatch } from '@lib_instances/store'
import { updateBoqHeaderCellAtStore } from '@entities/quotation'
import { type BoqHeaderKey } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateSubtotalTextCell = ({
  editorRef,
  itemIndex,
  boqHeaderKey,
}: Props): void => {
  const { didUpdate } = updateBoqHeaderCellAtStore({
    editorRef,
    itemIndex,
    boqHeaderKey,
  })

  if (didUpdate) {
    dispatch(
      navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }),
    )
  }
}
