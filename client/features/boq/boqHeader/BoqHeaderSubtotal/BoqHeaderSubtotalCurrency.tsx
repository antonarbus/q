import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalCurrency } from 'client/features/items/itemsSlice'
import { BoqItem } from 'client/features/items/types'
import { store } from 'client/store'
import { RefAny, RefDiv } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqHeaderSubtotalCurrency = ({ index }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]
  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      getHtml={() => (store.getState().items?.[index] as BoqItem)?.boq?.header?.subtotal?.currency?.html }
      placeholder='$'
      saveFroalaReducer={saveBoqHeaderSubtotalCurrency}
      additionalStyle={{
        textAlign: 'right',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        minWidth: 10,
      }}
    />
  )
}
