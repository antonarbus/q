import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { subTotalTextCellStyle } from '@front/entities/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateSubtotalTextAtBoqBlock } from '@front/features/blocks/update-subtotal-text-at-boq-block/updateSubtotalTextAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'
const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): React.JSX.Element => {
  const isFullAppView = useIsFullAppView()
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockSubtotalText',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isFullAppView={isFullAppView}
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
