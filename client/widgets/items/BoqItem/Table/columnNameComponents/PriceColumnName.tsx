import { itemBoqColumnNamePriceHtmlGetter } from 'client/entities/items'
import { changeBoqPriceColumnName } from 'client/features/change_text'
import { store } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  index: number
}

export const PriceColumnName = ({ index }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = store.getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Price...'
      initHtmlGetter={itemBoqColumnNamePriceHtmlGetter}
      onContentChange={changeBoqPriceColumnName}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
