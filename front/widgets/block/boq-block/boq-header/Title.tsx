import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { titleCellStyle } from '@front/entities/quotation/style/titleCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateBoqTitle } from '@front/features/blocks/update-boq-title/updateBoqTitle'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'

const boqHeaderKey: HeaderKey = 'title'

export const Title = (): React.JSX.Element => {
  const isEditorView = useIsEditorView()
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockTitle',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isEditorView={isEditorView}
      className='title'
      placeholder='Title...'
      contentGetter={() =>
        getHtmlOfBoqHeaderFromStoreByIndex({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onChange={() => {
        updateBoqTitle({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }}
      sx={titleCellStyle}
    />
  )
}
