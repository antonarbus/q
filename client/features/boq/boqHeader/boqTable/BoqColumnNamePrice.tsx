import { Froala } from 'client/components/Froala'
import { saveBoqColumnNamePriceHeight, saveBoqColumnNamePriceHtml } from 'client/features/items/itemsSlice'
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
  const { html = 'Price', height = 15 } = item.boq.column.price

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      initHeight={height}
      placeholder='Price...'
      saveHeightReducer={saveBoqColumnNamePriceHeight}
      saveHtmlReducer={saveBoqColumnNamePriceHtml}

      sx={{
        flexGrow: 1
      }}
    />
  )
}
