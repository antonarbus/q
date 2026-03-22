import { updateBoqHeaderAtStore } from '@front/entities/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@back/entity/quotation/schema'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const updateBoqTitle = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockTitle',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  updateBoqHeaderAtStore({
    editor,
    blockIndex: props.blockIndex,
    boqHeaderKey: props.boqHeaderKey,
  })
}
