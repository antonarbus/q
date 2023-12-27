import { boqHeaderHtmlGetter } from 'client/entities/items'
import { updateBoqHeader } from 'client/features/update_cell'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import { useBoqItem } from '../BoqItemProvider'
import { useItem } from '../../ItemProvider'

const boqHeaderKey = 'price'

export const SubTotalPrice = (): JSX.Element => {
  // todo: looks like we do not have to pass froalaElementRef
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { subTotalEditorRef } = useBoqItem()
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={subTotalEditorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Price...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (subTotalEditorRef.current === null) return
        const html = subTotalEditorRef.current.html.get()
        updateBoqHeader({ itemIndex, html, boqHeaderKey })
      }}
      additionalStyle={{
        width: '100%',
        minWidth: '100px',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        flexShrink: 0,
        right: 0,
        minHeight: '24px',
      }}
    />
  )
}
