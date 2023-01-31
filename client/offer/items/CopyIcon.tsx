import { ItemType } from 'client/offer/templateOffer'
import { useDispatchTyped } from 'client/store'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from '../../copy/copySlice'

type Props = {
  itemToCopy: ItemType
}

export const CopyIcon = ({ itemToCopy }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <MdCopyAll
      css={{ cursor: 'pointer' }}
      onClick={(e: React.MouseEvent) => {
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        dispatch(addItemIntoCopyContainer(itemToCopy))
      }}
    />
  )
}
