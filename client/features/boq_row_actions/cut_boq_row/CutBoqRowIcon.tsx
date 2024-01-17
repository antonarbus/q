import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { generalSlice } from '@entities/general'
import { copySlice } from '@entities/copy'
import { getBoqRowFromStore, itemsSlice, selectIsLastBoqRow, useItem, useRow } from '@entities/items'
import { className } from '@shared/className'
import { dispatch, getState, theme } from '@shared/clients'
import { useSelectorTyped } from '@shared/hooks'
import { saveItemsLocally } from '@shared/lib'
import { cleanHtml } from '@shared/lib/itemsUtils'

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
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        const clickedIconElement = e.target

        if (!(clickedIconElement instanceof Element)) return

        const boqRowElement = clickedIconElement.closest(`.${className.boqRow}`)

        if (!boqRowElement) return

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
          dispatch(generalSlice.actions.disableFroala())
          dispatch(copySlice.actions.showCopyContainer())
        }

        dispatch(generalSlice.actions.disableFroala())
        dispatch(itemsSlice.actions.deleteBoqRowReducer({ itemIndex, rowIndex }))

        dispatch(copySlice.actions.forbidToPaste())
        dispatch(copySlice.actions.forbidToCopy())
        dispatch(copySlice.actions.forbidToCut())
        dispatch(copySlice.actions.forbidToDelete())

        setTimeout(() => {
          dispatch(copySlice.actions.allowToPaste())
          dispatch(copySlice.actions.allowToCopy())
          dispatch(copySlice.actions.allowToCut())
          dispatch(copySlice.actions.allowToDelete())
        }, 1000 * theme.item.animationDuration)

        saveItemsLocally()
      }}
    >
      <TbCut />
    </motion.span>
  )
}
