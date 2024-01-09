import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, updateBoqHeaderCellAtStore } from 'client/entities/items'
import { type BoqHeaderKey } from 'client/shared/types'

const boqHeaderKey: BoqHeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef } = useBoqItem()
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={subTotalPriceEditorRef}
      placeholder='Price...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        updateBoqHeaderCellAtStore({
          itemIndex,
          boqHeaderKey,
          html: subTotalPriceEditorRef.current?.html.get() ?? '',
        })
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
