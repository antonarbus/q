import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { subTotalTextCellStyle } from '@front/entities/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateSubtotalTextAtBoqBlock } from '@front/features/blocks/update-subtotal-text-at-boq-block/updateSubtotalTextAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): React.JSX.Element => {
  const isEditorView = useIsEditorView()
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockSubtotalText',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isEditorView={isEditorView}
      className='sub-total-text'
      placeholder='Subtotal...'
      contentGetter={() =>
        getHtmlOfBoqHeaderFromStoreByIndex({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onChange={() => {
        updateSubtotalTextAtBoqBlock({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }}
      sx={subTotalTextCellStyle}
    />
  )
}
