import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entities/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateBoqColumnCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type ReactNode, useRef } from 'react'
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
