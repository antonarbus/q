import { Froala } from 'client/components/Froala'
import { saveBoqColumnNameItem } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqColumnNameItem = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef(null) as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Item' } = item.boq.column.item

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      placeholder='Item...'
      saveFroalaReducer={saveBoqColumnNameItem}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
