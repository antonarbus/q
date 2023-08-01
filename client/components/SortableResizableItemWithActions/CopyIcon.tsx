import { useDispatchTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from 'utils/itemsUtils'
import {
  addItemIntoCopyContainer,
  saveInitCordsOfCopyContainer,
  showCopyContainer,
} from 'client/entities/copy'
import { saveItemHeight } from 'client/entities/items'

interface Props {
  index: number
}

export const CopyIcon = ({ index }: Props) => {
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
        const items = document.querySelectorAll('.item-paper')
        items.forEach((item, index) => {
          const height = item.clientHeight
          dispatch(saveItemHeight({ index, height }))
        })

        dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const itemToCopy = store.getState().items[index]
        const html = (e.target as HTMLElement)!
          .closest('.item')!
          .querySelector('.item-paper')!.innerHTML
        const cleanedHtml = cleanHtml(html)
        const item = { ...itemToCopy, previewHtml: cleanedHtml }
        dispatch(addItemIntoCopyContainer(item))
      }}
    >
      <MdCopyAll />
    </motion.span>
  )
}
