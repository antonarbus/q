import { getBoqHeaderHtmlFromStore, useBoqItem, useItem, Froala, updateBoqHeaderCellAtStore } from 'client/entities/items'
import { showHideBoqPricePins } from 'client/features/pin'
import { type BoqHeaderKey } from 'client/shared/types'
import { useRef } from 'react'

const boqHeaderKey: BoqHeaderKey = 'subTotalPrice'

export const SubTotalPrice = (): JSX.Element => {
  const { subTotalPriceEditorRef, boqPriceEditorRefs } = useBoqItem()
  const { itemIndex } = useItem()

  const hidePinsClickHandlerRef = useRef<(e: MouseEvent) => void>((e) => {})
  const isInitClickRef = useRef(true)

  return (
    <Froala
    editorRef={subTotalPriceEditorRef}
    placeholder='Price...'
    htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
    onClick={(e) => {
      console.log('🚀 ~ SubTotalPrice ~ boqPriceEditorRefs:', boqPriceEditorRefs)
      showHideBoqPricePins({
        e,
        itemIndex,
        hidePinsClickHandlerRef,
        isInitClickRef,
      })
    }}
      onContentChange={() => {
        updateBoqHeaderCellAtStore({
          itemIndex,
          boqHeaderKey,
          html: subTotalPriceEditorRef.current?.html.get() ?? '',
        })
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onBlur={(e: any) => {
        // todo: looks like we need an click event listener

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
