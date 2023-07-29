import { Froala } from 'client/components/Froala'
import { saveBoqColumnNameQty } from 'client/features/items/itemsSlice'
import { BoqItem } from 'client/features/items/types'
import { store } from 'client/store'
import { RefDiv, RefAny } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqColumnNameQty = ({ index }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]
  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      getHtml={() => (store.getState().items?.[index] as BoqItem)?.boq?.column?.qty?.html}
      placeholder='Qty...'
      saveFroalaReducer={saveBoqColumnNameQty}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
