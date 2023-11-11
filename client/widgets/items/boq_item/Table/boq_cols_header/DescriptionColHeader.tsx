import { Froala } from 'client/shared/ui/froala'
import { ResizableColHeader } from './ResizableColHeader'
import { type ReactNode, useRef } from 'react'
import { itemBoqColumnNameDescriptionHtmlGetter } from 'client/entities/items'
import { changeBoqDescriptionColumnName } from 'client/features/change_text'

type Props = {
  itemIndex: number
}

export const DescriptionColHeader = ({ itemIndex }: Props): ReactNode => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)

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
        initHtmlGetter={itemBoqColumnNameDescriptionHtmlGetter}
        onContentChange={changeBoqDescriptionColumnName}
        additionalStyle={{
          flexGrow: 1,
        }}
      />
    </ResizableColHeader>
  )
}
