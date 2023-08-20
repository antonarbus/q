import { Item } from '../item'
import { Header } from './Header'

interface Props {
  index: number
}

export const BoqItem = ({ index }: Props): JSX.Element => {
  return (
    <Item index={index} >
      <Header index={index} />
      {/* <BoqTable index={index} /> */}
    </Item>
  )
}
