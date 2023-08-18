import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { TbCut } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { deleteItem, saveItemHeight, saveItemHeightByIndex, selectIsItemAlone } from 'client/entities/items'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { saveItemsLocally } from 'client/shared/lib'
import { addItemIntoCopyContainer, allowToPaste, forbidToPaste, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/entities/copy'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'

interface IProps {
  index: number
}

export const CutIcon = ({ index }: IProps): JSX.Element => {
  const dispatch = useDispatchTyped()
  const isItemAlone = useSelectorTyped(selectIsItemAlone)

  return (
    <motion.span
      whileHover={{
        scale: isItemAlone ? 1 : 1.3,
      }}
      whileTap={{ scale: 1 }}
      style={{
        color: isItemAlone ? '#acacac' : '#000',
        cursor: isItemAlone ? 'default' : 'pointer',
      }}
      onClick={(e: MouseEvent): void => {
        if (isItemAlone) return

        saveItemHeightByIndex({ index })

        const itemToCut = store.getState().items[index]
        if (!itemToCut) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)
        const item = { ...itemToCut, previewHtml: cleanedHtml }

        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem({ itemId: item.id }))
        dispatch(forbidToPaste())

        const isCopyContainer = store.getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(showCopyContainer())
        }

        saveItemsLocally()
      }}
    >
      <TbCut />
    </motion.span>
  )
}
