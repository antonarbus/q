import { useRef } from 'react'
import { ResizableColHeader } from './ResizableColHeader'
import { Froala } from 'client/shared/ui/froala'
import { boqColumnNameHtmlGetter } from 'client/entities/items'
import type FroalaEditor from 'froala-editor'
import { changeBoqColumnName } from 'client/features/change_text'

type Props = {
  itemIndex: number
}

const boqColumnKey = 'price'

export const PriceColHeader = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <ResizableColHeader
      headerName='price'
      className='th price resizable'
      itemIndex={itemIndex}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder='Price...'
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
