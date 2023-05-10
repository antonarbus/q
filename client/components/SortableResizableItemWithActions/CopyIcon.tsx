import { store, useDispatchTyped } from 'client/store'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCordsOfCopyContainer, showCopyContainer } from '../../features/copy/copySlice'
import { motion } from 'framer-motion'
import { cleanHtml } from 'utils/itemsUtils'

type TProps = {
  index: number
}

export const CopyIcon = ({ index }: TProps) => {
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
        const html = (e.target as HTMLElement)!.closest('.item')!.querySelector('.item-paper')!.innerHTML
        const cleanedHtml = cleanHtml(html)
        const item = { ...itemToCopy, previewHtml: cleanedHtml }
        dispatch(addItemIntoCopyContainer(item))
      }}
    >
      <MdCopyAll/>
    </motion.span>
  )
}
