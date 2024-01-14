import { Froala, getBoqColumnHtmlFromStore, updateBoqColumnCellAtStore, useItem, columnHeaderStyle } from 'client/entities/items'
import { ResizableColumn } from '../ResizableColumn'
import { type ReactNode, useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqColumnKey } from 'client/shared/types'

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
          updateBoqColumnCellAtStore({
            html: editorRef.current?.html.get() ?? '',
            itemIndex,
            boqColumnKey,
          })
        }}
        additionalStyle={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      />
    </ResizableColumn>
  )
}
