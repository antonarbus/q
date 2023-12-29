import { boqHeaderHtmlGetter } from 'client/entities/items'
import { updateBoqHeader } from 'client/features/update_cell'
import { Froala } from 'client/shared/ui/froala'
import { useBoqItem } from '../BoqItemProvider'
import { useItem } from '../../ItemProvider'

const boqHeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef } = useBoqItem()
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={subTotalPriceEditorRef}
      placeholder='Price...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (subTotalPriceEditorRef.current === null) return
        updateBoqHeader({ itemIndex, boqHeaderKey, html: subTotalPriceEditorRef.current.html.get() })
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
