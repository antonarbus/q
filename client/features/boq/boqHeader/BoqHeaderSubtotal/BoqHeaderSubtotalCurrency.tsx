import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalCurrency } from 'client/features/items/itemsSlice'
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

  if (item.type !== 'boq') return null
  const { html = 'EUR' } = item.boq.header.subtotal.currency

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
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
