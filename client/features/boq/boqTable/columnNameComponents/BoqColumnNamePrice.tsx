import { Froala } from 'client/components/Froala'
import { saveBoqColumnNamePriceHtml } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqColumnNamePrice = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Price' } = item.boq.column.price

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      placeholder='Price...'
      saveHtmlReducer={saveBoqColumnNamePriceHtml}
      additionalStyle={{
        textAlign: 'center'
      }}
    />
  )
}
