import { Froala } from 'client/components/Froala'
import { saveBoqColumnNamePrice } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { RefDiv, RefAny } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqColumnNamePrice = ({ index }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
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
      saveFroalaReducer={saveBoqColumnNamePrice}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
