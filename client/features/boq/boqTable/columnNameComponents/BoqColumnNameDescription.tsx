import { Froala } from 'client/components/Froala'
import { saveBoqColumnNameDescriptionHtml } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqColumnNameDescription = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Description' } = item.boq.column.description

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      placeholder='Description...'
      saveHtmlReducer={saveBoqColumnNameDescriptionHtml}
      additionalStyle={{
        flexGrow: 1
      }}
    />
  )
}
