import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { ItemType } from 'client/types'
import { TbCut } from 'react-icons/tb'
import { Resizable } from 're-resizable'

type Props = {
  itemToCut: ItemType,
  itemRef: React.MutableRefObject<Resizable>
}

export const CutIcon = ({ itemToCut, itemRef }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <TbCut
      css={{
        cursor: 'pointer',
        ':hover': {
          scale: '1.3',
          color: 'black',
          transition: 'scale 200ms'
        }
      }}
      onClick={() => {
        alert(666)
        // dispatch(deleteItem(itemToDelete))
      }}
    />
  )
}
