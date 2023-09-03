import { Item } from '../item'
import { Header } from './Header'
import { BoqTable } from './Table/BoqTable'

interface Props {
  index: number
}

// todo: we can resize BoqItem, same way as TextItem
// todo: but it does not save items width and we do not want it, we want to keep it all the time as 'auto'
// todo: instead we need...
// todo: make Description col width as 'undefined' to make it's width auto
// todo: and on the end of resize save its width again, it should do the trick

export const BoqItem = ({ index }: Props): JSX.Element => {
  return (
    <Item
      index={index}
      // disableResize={true}
      autoWidth={true}
      onItemResizeStop={(): void => {
        console.log('onItemResizeStop')
      }}
      onItemResize={(): void => {
        console.log('onItemResize')
      }}
      onItemResizeStart={(): void => {
        console.log('onItemResizeStart')
      }}
    >
      <Header index={index} />
      <BoqTable index={index} />
    </Item>
  )
}
