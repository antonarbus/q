import { useDispatchTyped } from 'client/store'
import { ItemType } from 'client/types'
import { IoTrashBinOutline } from 'react-icons/io'

type Props = {
  itemToDelete: ItemType
}

export const DeleteIcon = ({ itemToDelete }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <IoTrashBinOutline
      css={{ cursor: 'pointer' }}
      onClick={(e: React.MouseEvent) => {
        alert(666)
      }}
    />
  )
}
