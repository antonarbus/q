import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import { getBoqRowFromStore, isItemsFroalaSignal, itemsSlice, selectIsLastBoqRow, useItem, useRow } from '@entities/items'
import { className } from '@shared/consts/className'
import { navSlice } from '@shared/nav'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CutBoqRowIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isLastBoqRow || !isDeletable || !isCopyable

  return (
    <motion.span
      whileHover={{
        scale: disabled ? 1 : 2.3,
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

        const clickedIconElement = e.target

        if (!(clickedIconElement instanceof Element)) return

        const boqRowElement = clickedIconElement.closest(`.${className.boqRow}`)

        if (!boqRowElement) return

        isItemsFroalaSignal.value = false

        dispatch(itemsSlice.actions.updateBoqRowHeightAndWidthReducer({
          itemIndex,
          rowIndex,
          height: boqRowElement.clientHeight,
          width: boqRowElement.clientWidth,
        }))

        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
        if (boqRow === undefined) return

        dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: boqRow, preview: cleanedHtml }))

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(copySlice.actions.showCopyContainer())
        }

        dispatch(itemsSlice.actions.deleteBoqRowReducer({ itemIndex, rowIndex }))
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
          dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
        }, 1000 * theme.item.animationDuration)
      }}
    >
      <TbCut />
    </motion.span>
  )
}
