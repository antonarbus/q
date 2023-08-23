import { Item } from '../item'
import { Header } from './Header'
import { BoqTable } from './Table/BoqTable'

interface Props {
  index: number
}

export const BoqItem = ({ index }: Props): JSX.Element => {
  return (
    <Item index={index} >
      <Header index={index} />
      <BoqTable />
    </Item>
  )
}
