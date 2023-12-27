import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Froala } from 'client/shared/ui/froala'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import type FroalaEditor from 'froala-editor'
import { updateBoqColumn } from 'client/features/update_cell'
import { useItem } from 'client/widgets/items/ItemProvider'

const boqColumnKey = 'qty'

export const QtyColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Qty...'
        htmlGetter={() => boqColumnNameHtmlGetter({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          updateBoqColumn({ itemIndex, boqColumnKey, html })
        }}
        additionalStyle={{
          flexGrow: 1,
          textAlign: 'center',
          minHeight: '24px',
          paddingInline: '5px',
        }}
      />
    </ResizableColumn>
  )
}
