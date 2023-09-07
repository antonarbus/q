import { itemBoqHeaderSubtotalTextHtmlGetter } from 'client/entities/items'
import { changeBoqHeaderSubtotal } from 'client/features/change_text'
import { getState, store } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'

interface Props {
  itemIndex: number
}

export const SubtotalText = ({ itemIndex }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = getState().items[itemIndex]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      itemIndex={itemIndex}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Subtotal...'
      initHtmlGetter={itemBoqHeaderSubtotalTextHtmlGetter}
      onContentChange={changeBoqHeaderSubtotal}
      additionalStyle={{
        height: '100%',
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right',
      }}
    />
  )
}
