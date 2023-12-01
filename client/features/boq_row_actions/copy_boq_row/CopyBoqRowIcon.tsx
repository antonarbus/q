import { useSelectorTyped } from 'client/shared/hooks'
import { dispatch, getState } from 'client/shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { copySlice } from 'client/entities/copy'
import { itemsSlice } from 'client/entities/items'
import type { MouseEvent } from 'react'
import type { BoqRow } from 'client/shared/types'
import { className } from 'client/shared/className'
import { appSlice } from 'client/entities/app'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const CopyBoqRowIcon = ({ itemIndex, rowIndex }: Props): JSX.Element => {
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

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
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(appSlice.actions.disableFroala())
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    >
      <MdCopyAll />
    </motion.span>
  )
}
