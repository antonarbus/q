import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import type FroalaEditor from 'froala-editor'
import { updateBoqColumn } from 'client/features/update_cell'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { Froala } from 'client/shared/ui/froala'
import { useItem } from 'client/widgets/items/ItemProvider'
import { type BoqColumnKey } from 'client/shared/types'

const boqColumnKey: BoqColumnKey = 'number'

export const NumberColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={30}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder=''
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
