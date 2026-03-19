import { updateBoqHeaderAtStore } from '@entity/quotation/redux/updater/updateBoqHeaderAtStore'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { editorRegistry, getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const onChangeSubtotalTextAtBoqBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockSubtotalText',
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
