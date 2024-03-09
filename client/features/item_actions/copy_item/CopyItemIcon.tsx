import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, itemType, itemsSlice, saveItemHeightByIndex, useItem } from '@entities/items'
import { className } from '@shared/consts/className'
import { cleanHtml } from '@shared/lib/itemsUtils'

export const CopyItemIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
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
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        dispatch(itemsSlice.actions.removeItemsMsgReducer())

        saveItemHeightByIndex({ itemIndex })

        const itemToCopy = getState().items[itemIndex]
        if (!itemToCopy) return
        if (itemToCopy.type === itemType.paste) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)

        dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: itemToCopy, preview: cleanedHtml }))
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          isItemsFroalaSignal.value = false
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    >
      <MdCopyAll />
    </motion.span>
  )
}
