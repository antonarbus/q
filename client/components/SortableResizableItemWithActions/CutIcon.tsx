import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { TbCut } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { deleteItem, saveItemHeight, selectIsLastItem } from '../../features/items/itemsSlice'
import { cleanHtml } from 'utils/itemsUtils'
import { saveItemsIntoLocalStorage } from 'client/features/items'
import { tellItemsSavedLocally } from 'client/features/items'
import { addItemIntoCopyContainer, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/entities/copy'

type Props = {
  index: number
}

export const CutIcon = ({ index }: Props) => {
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
      onClick={(e: React.MouseEvent) => {
        if (isLastItem) return

        const items = document.querySelectorAll('.item-paper')
        items.forEach((item, index) => {
          const height = item.clientHeight
          dispatch(saveItemHeight({ index, height }))
        })

        dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const itemToCut = store.getState().items[index]
        const html = (e.target as HTMLElement)!.closest('.item')!.querySelector('.item-paper')!.innerHTML
        const cleanedHtml = cleanHtml(html)
        const item = { ...itemToCut, previewHtml: cleanedHtml }
        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem(itemToCut))
        saveItemsIntoLocalStorage()
        dispatch(tellItemsSavedLocally())
      }}
    >
      <TbCut/>
    </motion.span>
  )
}
