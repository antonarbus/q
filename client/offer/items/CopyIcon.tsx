import { useDispatchTyped } from 'client/store'
import { ItemType } from 'client/types'
import { Resizable } from 're-resizable'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from '../../copy/copySlice'

type Props = {
  itemToCopy: ItemType
  itemRef: React.MutableRefObject<Resizable>
}

export const CopyIcon = ({ itemToCopy, itemRef }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <MdCopyAll
      css={{
        cursor: 'pointer',
        position: 'relative',
        top: 1
      }}
      onClick={(e: React.MouseEvent) => {
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const item = { ...itemToCopy, height: itemRef?.current?.resizable?.clientHeight || 0 }
        dispatch(addItemIntoCopyContainer(item))
      }}
    />
  )
}
