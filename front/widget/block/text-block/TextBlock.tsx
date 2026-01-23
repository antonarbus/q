import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getTextBlockHtmlFromStore } from '@entity/quotation/redux/getter/getTextBlockHtmlFromStore'
import { textItemCellStyle } from '@entity/quotation/style/textItemCellStyle'
import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { CopyBlockIcon } from '@feature/blocks/copy'
import { CutBlockIcon } from '@feature/blocks/cut'
import { DeleteBlockIcon } from '@feature/blocks/delete'
import { DragBlockIcon } from '@feature/blocks/drag'
import {
  onTextBlockResizeStart,
  onTextBlockResizeStop,
} from '@feature/blocks/resize'
import { updateTextBlock } from '@feature/blocks/update'
import { beforeUpload } from '@feature/file/upload-file'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { TiptapExample } from '@page/test-page/tiptap-example/TiptapExample'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'

export const TextBlock = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <BlockComp
      className={cls.textBlock}
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      onBlockResizeStart={onTextBlockResizeStart}
      onBlockResizeStop={onTextBlockResizeStop}
      rightBlockActionButtons={
        <ItemActionButtonsLayout>
          <BookmarkBlockIcon />
          <OpenInfoBlockModalIcon />
          <DeleteBlockIcon />
        </ItemActionButtonsLayout>
      }
    >
      {/* <Froala
        beforeUpload={beforeUpload}
        droppable
        editorRef={editorRef}
        htmlGetter={() =>
          getTextBlockHtmlFromStore({ blockIndex: block.index })
        }
        onContentChange={() => {
          updateTextBlock({ editorRef, blockIndex: block.index })
        }}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        style={textItemCellStyle}
      /> */}
      <TiptapExample
        content={getTextBlockHtmlFromStore({ blockIndex: block.index })}
        onContentChange={(params) => {
          const html = params.editor.getHTML()
          console.log(html)
        }}
      />
    </BlockComp>
  )
}
