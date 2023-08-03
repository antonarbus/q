import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { TbCut } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { deleteItem, saveItemHeight, selectIsLastItem } from 'client/entities/items'
import { cleanHtml } from 'utils/itemsUtils'
import { saveItemsLocally } from 'client/features/save_items_locally'
import { addItemIntoCopyContainer, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/entities/copy'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'

interface Props {
  index: number
}

export const CutIcon = ({ index }: Props): EmotionJSX.Element => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(selectIsLastItem)

  return (
    <motion.span
      whileHover={{ scale: isLastItem ? 1 : 1.3 }}
      whileTap={{ scale: 1 }}
      style={{
        color: isLastItem ? '#acacac' : '#000',
        cursor: isLastItem ? 'default' : 'pointer',
      }}
      onClick={(e: React.MouseEvent): void => {
        if (isLastItem) return

        const items = document.querySelectorAll('.item-paper')
        items.forEach((item, index) => {
          const height = item.clientHeight
          dispatch(saveItemHeight({ index, height }))
        })

        dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const itemToCut = store.getState().items[index]
        const itemElement = (e.target as HTMLElement).closest('.item')
        if (itemElement === null) return
        const itemPaperElement = itemElement.querySelector('.item-paper')
        if (itemPaperElement === null) return
        const html = itemPaperElement.innerHTML
        const cleanedHtml = cleanHtml(html)
        const item = { ...itemToCut, previewHtml: cleanedHtml }
        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem({ itemId: item.id }))
        saveItemsLocally()
      }}
    >
      <TbCut />
    </motion.span>
  )
}
