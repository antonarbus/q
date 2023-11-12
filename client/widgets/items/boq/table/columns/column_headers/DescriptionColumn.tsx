import { Froala } from 'client/shared/ui/froala'
import { ResizableColumn } from '../ResizableColumn'
import { type ReactNode, useRef } from 'react'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { changeBoqColumn } from 'client/features/change_text'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
}

const boqColumnKey = 'description'

export const DescriptionColumn = ({ itemIndex }: Props): ReactNode => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      itemIndex={itemIndex}
      minWidth={200}
      flexGrow={1}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder='Description...'
        initHtml={boqColumnNameHtmlGetter({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeBoqColumn({ itemIndex, boqColumnKey, html })
        }}
        additionalStyle={{
          flexGrow: 1,
        }}
      />
    </ResizableColumn>
  )
}
