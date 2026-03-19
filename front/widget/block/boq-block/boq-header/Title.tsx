import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqHeaderFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqHeaderFromStoreByIndex'
import { titleCellStyle } from '@entity/quotation/style/titleCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { TextEditor } from '@shared/component/TextEditor'
import { onChangeTitleAtBoqBlock } from '@feature/blocks/on-text-change/on-change-title-at-boq-block/onChangeTitleAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'
const boqHeaderKey: HeaderKey = 'title'

export const Title = (): React.JSX.Element => {
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockTitle',
        blockIndex: block.index,
        rowIndex: null,
      })}
      className='title'
      placeholder='Title...'
      contentGetter={() =>
        getHtmlOfBoqHeaderFromStoreByIndex({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onChange={() => {
        onChangeTitleAtBoqBlock({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }}
      sx={titleCellStyle}
    />
  )
}
