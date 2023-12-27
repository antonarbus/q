import { boqHeaderHtmlGetter } from 'client/entities/items'
import { updateBoqHeader } from 'client/features/update_cell'
import { Froala } from 'client/shared/ui/froala'
import { useBoqItem } from '../BoqItemProvider'
import { useItem } from '../../ItemProvider'

const boqHeaderKey = 'price'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalEditorRef } = useBoqItem()
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={subTotalEditorRef}
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
