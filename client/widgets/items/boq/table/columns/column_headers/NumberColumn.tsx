import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import type FroalaEditor from 'froala-editor'
import { changeBoqColumn } from 'client/features/change_text'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { Froala } from 'client/shared/ui/froala'

type Props = {
  itemIndex: number
}

const boqColumnKey = 'number'

export const NumberColumn = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      itemIndex={itemIndex}
      minWidth={30}
      flexGrow={0}
    >
      <Froala
        itemIndex={itemIndex}
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
        }}
      />
    </ResizableColumn>
  )
}
