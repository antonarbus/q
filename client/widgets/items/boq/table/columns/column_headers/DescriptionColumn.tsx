import { type ReactNode, useRef } from 'react'
import { updateBoqColumnCell } from '@features/update_cell'
import { Froala, getBoqColumnHtmlFromStore, useItem, columnHeaderStyle } from '@entities/items'
import { type BoqColumnKey } from '@entities/items'
import { type FroalaEditor } from '@shared/types'
import { ResizableColumn } from '../ResizableColumn'

const boqColumnKey: BoqColumnKey = 'description'

export const DescriptionColumn = (): ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={200}
      flexGrow={1}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Description...'
        htmlGetter={() => getBoqColumnHtmlFromStore({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          updateBoqColumnCell({ editorRef, itemIndex, boqColumnKey })
        }}
        additionalStyle={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      />
    </ResizableColumn>
  )
}
