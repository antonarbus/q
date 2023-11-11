import { itemBoqHeaderCurrencyHtmlGetter } from 'client/entities/items'
import { changeBoqHeaderCurrency } from 'client/features/change_text'
import { getState } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { type ReactNode, useRef } from 'react'

type Props = {
  itemIndex: number
}

export const Currency = ({ itemIndex }: Props): ReactNode => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = getState().items[itemIndex]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      itemIndex={itemIndex}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='$...'
      initHtmlGetter={itemBoqHeaderCurrencyHtmlGetter}
      onContentChange={changeBoqHeaderCurrency}
      additionalStyle={{
        textAlign: 'right',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        minWidth: 10,
      }}
    />
  )
}
