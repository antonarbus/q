import { itemBoqHeaderPriceHtmlGetter } from 'client/entities/items'
import { changeBoqHeaderPrice } from 'client/features/change_text'
import { getState } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { type ReactNode, useRef } from 'react'

type Props = {
  itemIndex: number
}

export const Price = ({ itemIndex }: Props): ReactNode => {
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
      initHtmlGetter={itemBoqHeaderPriceHtmlGetter}
      onContentChange={changeBoqHeaderPrice}
      additionalStyle={{
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right',
      }}
    />
  )
}
