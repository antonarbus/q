import { Froala, getBoqColumnHtmlFromStore, useItem, columnHeaderStyle } from '@entities/items'
import { ResizableColumn } from '../ResizableColumn'
import { type ReactNode, useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqColumnKey } from '@shared/types'
import { updateBoqColumnCell } from '@features/update_cell'

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
