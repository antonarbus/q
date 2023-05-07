import { store, useDispatchTyped } from 'client/store'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCordsOfCopyContainer, showCopyContainer } from '../../features/copy/copySlice'
import { motion } from 'framer-motion'
import { RefResizableType } from 'client/types'
import { cleanHtml } from 'utils/itemsUtils'

type Props = {
  itemRef: RefResizableType
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
        dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const itemToCopy = store.getState().items[index]
        const itemHtml = itemRef.current.resizable?.innerHTML || ''
        const item = { ...itemToCopy, previewHtml: cleanHtml(itemHtml) }
        dispatch(addItemIntoCopyContainer(item))
      }}
    >
      <MdCopyAll/>
    </motion.span>
  )
}
