import { Froala } from 'client/shared/ui/froala'
import { ResizableColHeader } from './ResizableColHeader'
import { type ReactNode, useRef } from 'react'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { changeBoqColumnName } from 'client/features/change_text'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
}

const boqColumnKey = 'description'

export const DescriptionColHeader = ({ itemIndex }: Props): ReactNode => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColHeader
      headerName='description'
      className='th description resizable'
      itemIndex={itemIndex}
      minWidth={200}
      flexGrow={1}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder='Description...'
        initHtmlGetter={() => boqColumnNameHtmlGetter({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeBoqColumnName({ itemIndex, boqColumnKey, html })
        }}
        additionalStyle={{
          flexGrow: 1,
        }}
      />
    </ResizableColHeader>
  )
}
