import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { subTotalTextCellStyle } from '@entity/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { TextEditor } from '@shared/component/TextEditor'
import { updateSubtotalTextAtBoqBlock } from '@feature/blocks/update-subtotal-text-at-boq-block/updateSubtotalTextAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'
const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): React.JSX.Element => {
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockSubtotalText',
        blockIndex: block.index,
        rowIndex: null,
      })}
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
