import { Froala } from 'client/components/Froala'
import { saveBoqColumnNameQty } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqColumnNameQty = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Qty' } = item.boq.column.qty

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      placeholder='Qty...'
      saveFroalaReducer={saveBoqColumnNameQty}
      additionalStyle={{
        textAlign: 'center'
      }}
    />
  )
}
