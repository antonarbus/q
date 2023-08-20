import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { addItemIntoCopyContainer, allowToPaste, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/entities/copy'
import { saveItemHeightByIndex } from 'client/entities/items'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'

interface Props {
  index: number
}

export const CopyIcon = ({ index }: Props): JSX.Element => {
  const dispatch = useDispatchTyped()

  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <motion.span
      whileHover={{
        scale: disabled ? 1 : 1.3,
      }}
      whileTap={{ scale: 1 }}
      css={{
        position: 'relative',
        top: 1,
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

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
