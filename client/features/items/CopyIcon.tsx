import { useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from '../copy/copySlice'
import { motion } from 'framer-motion'
import { ItemType } from './types'

type Props = {
  itemToCopy: ItemType
  itemRef: React.MutableRefObject<Resizable>
}

export const CopyIcon = ({ itemToCopy, itemRef }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <motion.span
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 1 }}
      css={{
        cursor: 'pointer',
        position: 'relative',
        top: 1,
      }}
      onClick={(e: React.MouseEvent) => {
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const item = { ...itemToCopy, height: itemRef?.current?.resizable?.clientHeight || 0 }
        dispatch(addItemIntoCopyContainer(item))
      }}
    >
      <MdCopyAll/>
    </motion.span>
  )
}
