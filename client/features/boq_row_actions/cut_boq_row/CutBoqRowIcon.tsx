import { useSelectorTyped } from 'client/shared/hooks'
import { dispatch, getState, theme } from 'client/shared/clients'
import { TbCut } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { copySlice, exitCopyMode } from 'client/entities/copy'
import { itemsSlice, selectIsLastBoqRow } from 'client/entities/items'
import type { MouseEvent } from 'react'
import type { BoqRow } from 'client/shared/types'
import { className } from 'client/shared/className'
import { saveItemsLocally } from 'client/shared/lib'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const CutBoqRowIcon = ({ itemIndex, rowIndex }: Props): JSX.Element => {
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const isBoqRowAlone = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isBoqRowAlone || !isDeletable || !isCopyable

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

        dispatch(itemsSlice.actions.saveBoqRowHeightAndWidth({
          itemIndex,
          rowIndex,
          height: boqRowElement.clientHeight,
          width: boqRowElement.clientWidth,
        }))

        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const item = getState().items[itemIndex]
        if (item?.type !== 'boq') return
        const boqRow = item.boq.rows[rowIndex]
        if (!boqRow) return

        dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: boqRow, preview: cleanedHtml }))
        // dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(copySlice.actions.showCopyContainer())
        }

        dispatch(copySlice.actions.enterIntoCopyMode())
        dispatch(itemsSlice.actions.deleteBoqRow({ itemIndex, rowIndex }))

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

        // exitCopyMode({ delayed: true })
        saveItemsLocally()
      }}
    >
      <TbCut />
    </motion.span>
  )
}
