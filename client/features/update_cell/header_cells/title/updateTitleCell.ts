import { updateBoqHeaderCellAtStore } from '@entities/items'
import { type BoqHeaderKey } from '@shared/types'
import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateTitleCell = ({ editorRef, itemIndex, boqHeaderKey }: Props): void => {
  updateBoqHeaderCellAtStore({ editorRef, itemIndex, boqHeaderKey })
}
