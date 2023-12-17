import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import type FroalaEditor from 'froala-editor'
import { changeBoqColumn } from 'client/features/change_cell'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { Froala } from 'client/shared/ui/froala'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'

const boqColumnKey = 'number'

export const NumberColumn = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItemIndex()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={30}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder=''
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
