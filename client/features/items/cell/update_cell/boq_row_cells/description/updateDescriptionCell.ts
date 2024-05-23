import { dispatch } from '@lib_instances/store'
import {
  type BoqRowCellKey,
  didBoqCellContentChange,
  updateBoqRowCellAtStore,
} from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const updateDescriptionCell = ({
  editorRef,
  itemIndex,
  rowIndex,
  boqRowCellKey,
}: Props): void => {
  if (editorRef.current === null) return

  const didContentChange = didBoqCellContentChange({
    editor: editorRef.current,
    itemIndex,
    rowIndex,
    boqRowCellKey,
  })

  if (!didContentChange) return

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqRowCellKey,
    html: editorRef.current.html.get(),
  })

  dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
}
