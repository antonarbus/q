import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalCurrencyHeight, saveBoqHeaderSubtotalCurrencyHtml } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefAny, TRefDiv } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeaderSubtotalCurrency = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'EUR', height = 24 } = item.boq.header.subtotal.currency

  return (
    <Froala
      initOnClick
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      initHeight={height}
      placeholder='$'
      saveHeightReducer={saveBoqHeaderSubtotalCurrencyHeight}
      saveHtmlReducer={saveBoqHeaderSubtotalCurrencyHtml}
      sx={{
        textAlign: 'right',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        minWidth: 10
      }}
    />
  )
}
