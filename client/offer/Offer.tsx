import { ResizablePaper } from './ResizablePaper'
import { useSelectorTyped } from '@client/store'
import parseHtml from 'html-react-parser'

export const Offer = () => {
  const { items } = useSelectorTyped(state => state.offer)
  const itemsArr = Object.values(items)

  return (
    <>
      {itemsArr.map((item) => {
        if (item.type === 'text') {
          return (
            <ResizablePaper key={item.id} id={item.id} savedWidth={item.width}>
              {parseHtml(item.innerHtml)}
            </ResizablePaper>
          )
        }
        return null
      })}
    </>
  )
}
