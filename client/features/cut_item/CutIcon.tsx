import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { TbCut } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { deleteItem, saveItemHeightByIndex, selectIsItemAlone } from 'client/entities/items'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { saveItemsLocally } from 'client/shared/lib'
import { addItemIntoCopyContainer, allowToCopy, allowToCut, allowToDelete, allowToPaste, forbidToCopy, forbidToCut, forbidToDelete, forbidToPaste, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/entities/copy'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'
import { theme } from 'client/shared/clients'

interface Props {
  index: number
}

export const CutIcon = ({ index }: Props): JSX.Element => {
  const dispatch = useDispatchTyped()

  const isItemAlone = useSelectorTyped(selectIsItemAlone)
  const isCuttable = useSelectorTyped(state => state.copy.isCuttable)
  const disabled = isItemAlone || !isCuttable

  return (
    <motion.span
      whileHover={{
        scale: disabled ? 1 : 1.3,
      }}
      whileTap={{ scale: 1 }}
      style={{
        color: disabled ? '#acacac' : '#000',
        cursor: disabled ? 'default' : 'pointer',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

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
        dispatch(deleteItem({ itemId: itemToCut.id }))

        dispatch(forbidToPaste())
        dispatch(forbidToCopy())
        dispatch(forbidToCut())
        dispatch(forbidToDelete())

        const isCopyContainer = store.getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(showCopyContainer())
        }

        setTimeout(() => {
          dispatch(allowToPaste())
          dispatch(allowToCopy())
          dispatch(allowToCut())
          dispatch(allowToDelete())
        }, 1000 * theme.item.animationDuration)

        saveItemsLocally()
      }}
    >
      <TbCut />
    </motion.span>
  )
}
