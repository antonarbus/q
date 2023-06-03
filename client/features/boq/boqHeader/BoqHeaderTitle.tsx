import { Froala } from 'client/components/Froala'
import { saveBoqHeaderTitleHeight, saveBoqHeaderTitleHtml } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, TRefAny } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeaderTitle = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Title', height = 24 } = item.boq.header.title

  return (
    <Froala
      initOnClick
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHeight={height}
      initHtml={html}
      saveHeightReducer={saveBoqHeaderTitleHeight}
      saveHtmlReducer={saveBoqHeaderTitleHtml}
      placeholder='Title...'
      sx={{ flexGrow: 1 }}
    />
  )
}
