import { useRef } from 'react'
import type { ReactNode } from 'react'
import { updateBoqColumnCell } from '@features/blocks/cell/update-cell'
import {
  Froala,
  getBoqColumnHtmlFromStore,
  useBlock,
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/type/froala'
import { ResizableColumn } from '../ResizableColumn'

export const DescriptionColumn = (): ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.description}
      className={`th ${boqColumnKey.description} resizable`}
      flexGrow={1}
      minWidth={columnMinWidth.description}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex,
            boqColumnKey: boqColumnKey.description,
          })
        }
        onContentChange={() => {
          updateBoqColumnCell({
            editorRef,
            blockIndex,
            boqColumnKey: boqColumnKey.description,
          })
        }}
        placeholder='Description...'
        style={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      />
    </ResizableColumn>
  )
}
