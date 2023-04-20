import parseHtml from 'html-react-parser'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { store } from 'client/store'

type Props = {
  index: number
}

export const TextItem = ({ index }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const item = store.getState().items?.[index]
  if (item.type !== 'text') return null

  return (
    <DraggableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      {parseHtml(item.text.html)}
    </DraggableResizableItemWithActions>
  )
}
