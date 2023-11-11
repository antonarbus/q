import { useRef } from 'react'
import { ResizableColHeader } from './ResizableColHeader'
import type FroalaEditor from 'froala-editor'
import { changeBoqColumnName } from 'client/features/change_text'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import { Froala } from 'client/shared/ui/froala'

type Props = {
  itemIndex: number
}

const boqColumnKey = 'number'

export const NumberColHeader = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColHeader
      headerName='number'
      className='th number resizable'
      itemIndex={itemIndex}
      minWidth={30}
      flexGrow={0}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder='#...'
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
