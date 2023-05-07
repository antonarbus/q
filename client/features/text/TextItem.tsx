import parseHtml from 'html-react-parser'
import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { useRef } from 'react'
import { store } from 'client/store'
import { RefResizableType } from 'client/types'

type Props = {
  index: number
}

export const TextItem = ({ index }: Props) => {
  const itemRef = useRef() as RefResizableType
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
