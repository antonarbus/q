import { dispatch } from '@lib_instances/store'
import { type FroalaEditorRef } from '@shared/types/froala'
import type { BoqColumnKey } from '../../types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import { quotationSlice } from '../quotationSlice'

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

  dispatch(
    quotationSlice.actions.updateBoqColumnNameTextReducer({
      itemIndex,
      html,
      boqColumnKey,
    }),
  )
}
