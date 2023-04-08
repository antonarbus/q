import { store, useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from '../../features/copy/copySlice'
import { motion } from 'framer-motion'

type Props = {
  itemRef?: React.MutableRefObject<Resizable>
  index: number
}

export const CopyIcon = ({ itemRef, index }: Props) => {
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
        const itemToCopy = store.getState().items[index]
        const item = { ...itemToCopy, height: itemRef?.current?.resizable?.clientHeight || 0 }
        dispatch(addItemIntoCopyContainer(item))
      }}
    >
      <MdCopyAll/>
    </motion.span>
  )
}
