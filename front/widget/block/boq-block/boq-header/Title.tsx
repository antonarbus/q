import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { titleCellStyle } from '@entity/quotation/style/titleCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { onChangeTitleAtBoqBlock } from '@feature/blocks/on-text-change/on-change-title-at-boq-block/onChangeTitleAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'
const boqHeaderKey: HeaderKey = 'title'

export const Title = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
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
        getBoqHeaderHtmlFromStore({ blockIndex: block.index, boqHeaderKey })
      }
      onUpdate={() => {
        onChangeTitleAtBoqBlock({
          blockIndex: block.index,
          boqHeaderKey,
          editorRef,
        })
      }}
      sx={titleCellStyle}
    />
  )
}
