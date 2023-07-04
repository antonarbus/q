import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalPrice } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefAny, TRefDiv } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeaderSubtotalPrice = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const { html = 'Title', height } = item.boq.header.subtotal.price

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      height={height}
      onClickAwayIfHtmChanged={() => {
        // todo: logic to save value should go here
        console.log('logic to save value should go here')
      }}
      placeholder='Price...'
      saveFroalaReducer={saveBoqHeaderSubtotalPrice}
      additionalStyle={{
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right',
      }}
    />
  )
}
