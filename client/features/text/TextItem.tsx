import parseHtml from 'html-react-parser'
import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { store } from 'client/store'

type TProps = {
  index: number
}

export const TextItem = ({ index }: TProps) => {
  const item = store.getState().items?.[index]

  if (item.type !== 'text') return null

  return (
    <SortableResizableItemWithActions index={index} >
      {parseHtml(item.text.html)}
    </SortableResizableItemWithActions>
  )
}
