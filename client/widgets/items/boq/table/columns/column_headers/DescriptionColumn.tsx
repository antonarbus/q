import { Froala } from 'client/shared/ui/froala'
import { ResizableColumn } from '../ResizableColumn'
import { type ReactNode, useRef } from 'react'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { changeBoqColumn } from 'client/features/change_cell'
import type FroalaEditor from 'froala-editor'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'

const boqColumnKey = 'description'

export const DescriptionColumn = (): ReactNode => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItemIndex()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={200}
      flexGrow={1}
    >
      <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder='Description...'
        htmlGetter={() => boqColumnNameHtmlGetter({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeBoqColumn({ itemIndex, boqColumnKey, html })
        }}
        additionalStyle={{
          flexGrow: 1,
          minHeight: '24px',
          paddingInline: '5px',
        }}
      />
    </ResizableColumn>
  )
}
