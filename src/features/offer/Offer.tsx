import { ResizablePaper } from './ResizablePaper'
import { useSelectorTyped } from '@src/store'
import parseHtml from 'html-react-parser'

export const Offer = () => {
  const { items } = useSelectorTyped(state => state.offer)
  const itemsArr = Object.values(items)

  console.log(666)

  return (
    <>
      {
        itemsArr.map((item) => {
          if (item.type === 'text') {
            return (
              <ResizablePaper key={item.id} id={item.id}>
                {parseHtml(item.innerHtml)}
              </ResizablePaper>
            )
          }
          return null
        })
      }
    </>
  )
}
