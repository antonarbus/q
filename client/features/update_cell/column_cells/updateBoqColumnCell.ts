import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { updateBoqColumnCellAtStore } from '@entities/items'
import type { BoqColumnKey } from '@shared/types'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqColumnCell = ({
  editorRef,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  updateBoqColumnCellAtStore({ editorRef, itemIndex, boqColumnKey })
}
