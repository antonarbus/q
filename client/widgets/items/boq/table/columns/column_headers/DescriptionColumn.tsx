import { Froala } from 'client/shared/ui/froala'
import { ResizableColumn } from '../ResizableColumn'
import { type ReactNode, useRef } from 'react'
import { boqColumnNameHtmlGetter, useItem } from 'client/entities/items'
import { updateBoqColumnCell } from 'client/features/update_text'
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
        htmlGetter={() => boqColumnNameHtmlGetter({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          updateBoqColumnCell({ itemIndex, boqColumnKey, html })
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
