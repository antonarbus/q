import { useDispatchTyped } from 'client/store'
import { ItemType } from 'client/types'
import { TbCut } from 'react-icons/tb'
import { Resizable } from 're-resizable'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from 'client/copy/copySlice'
import { deleteItem } from '../offerSlice'

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
      onClick={(e: React.MouseEvent) => {
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const item = { ...itemToCut, height: itemRef?.current?.resizable?.clientHeight || 0 }
        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem(itemToCut))
      }}
    />
  )
}
