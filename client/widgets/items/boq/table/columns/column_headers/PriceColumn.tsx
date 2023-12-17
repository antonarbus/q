import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Froala } from 'client/shared/ui/froala'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import type FroalaEditor from 'froala-editor'
import { changeBoqColumn } from 'client/features/change_cell'
import { useItem } from 'client/widgets/items/ItemProvider'

const boqColumnKey = 'price'

export const PriceColumn = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
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
        froalaElementRef={froalaElementRef}
        placeholder='Price...'
        htmlGetter={() => boqColumnNameHtmlGetter({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeBoqColumn({ itemIndex, boqColumnKey, html })
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
