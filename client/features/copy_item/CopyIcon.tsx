import { useDispatchTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { addItemIntoCopyContainer, allowToPaste, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/entities/copy'
import { saveItemHeightByIndex } from 'client/entities/items'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'

interface IProps {
  index: number
}

export const CopyIcon = ({ index }: IProps): JSX.Element => {
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
      onClick={(e: MouseEvent): void => {
        saveItemHeightByIndex({ index })

        const itemToCopy = store.getState().items[index]
        if (!itemToCopy) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)

        const item = { ...itemToCopy, previewHtml: cleanedHtml }

        dispatch(addItemIntoCopyContainer(item))
        dispatch(allowToPaste())

        const isCopyContainer = store.getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(showCopyContainer())
        }
      }}
    >
      <MdCopyAll />
    </motion.span>
  )
}
