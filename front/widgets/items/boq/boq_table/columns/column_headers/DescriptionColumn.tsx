import { type ReactNode, useRef } from 'react'
import { updateBoqColumnCell } from '@features/items/cell/update_cell'
import {
  Froala,
  getBoqColumnHtmlFromStore,
  useItem,
  columnHeaderStyle,
  boqColumnKey,
} from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'

export const DescriptionColumn = (): ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.description}
      className={`th ${boqColumnKey.description} resizable`}
      minWidth={200}
      flexGrow={1}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Description...'
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            itemIndex,
            boqColumnKey: boqColumnKey.description,
          })
        }
        onContentChange={() => {
          updateBoqColumnCell({
            editorRef,
            itemIndex,
            boqColumnKey: boqColumnKey.description,
          })
        }}
        style={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      />
    </ResizableColumn>
  )
}
