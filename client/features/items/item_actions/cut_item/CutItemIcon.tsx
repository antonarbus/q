import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import { itemType, itemsSlice, saveItemHeightByIndex, selectIsLastItem, useItem } from '@entities/items'
import { className } from '@shared/consts/className'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CutItemIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const isItemAlone = useSelectorTyped(selectIsLastItem)
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
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        dispatch(itemsSlice.actions.removeItemsMsgReducer())

        saveItemHeightByIndex({ itemIndex })

        const itemToCut = getState().items[itemIndex]
        if (!itemToCut) return
        if (itemToCut.type === itemType.paste) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)

        dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: itemToCut, preview: cleanedHtml }))
        dispatch(itemsSlice.actions.deleteItemReducer({ itemId: itemToCut.id }))
        dispatch(copySlice.actions.forbidAllActions())

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(copySlice.actions.showCopyContainer())
        }

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
        }, 1000 * theme.item.animationDuration)
      }}
    >
      <TbCut />
    </motion.span>
  )
}
