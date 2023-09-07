import { itemBoqColumnNamePriceHtmlGetter } from 'client/entities/items'
import { changeBoqPriceColumnName } from 'client/features/change_text'
import { getState } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  itemIndex: number
}

export const PriceColumnName = ({ itemIndex }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = getState().items[itemIndex]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      itemIndex={itemIndex}
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
