import parseHtml from 'html-react-parser'
import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { useRef } from 'react'
import { store } from 'client/store'
import { TRefResizable } from 'client/types'

type TProps = {
  index: number
}

export const TextItem = ({ index }: TProps) => {
  const itemRef = useRef() as TRefResizable
  const item = store.getState().items?.[index]
  if (item.type !== 'text') return null

  return (
    <SortableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      {parseHtml(item.text.html)}
    </SortableResizableItemWithActions>
  )
}
