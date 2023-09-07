import { useSelectorTyped } from 'client/shared/hooks'
import { dispatch, getState } from 'client/shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { copySlice } from 'client/entities/copy'
import { itemsSlice, saveItemHeightByIndex } from 'client/entities/items'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'
import type { BoqRow } from 'client/shared/types'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRow
}

export const CopyBoqRowIcon = ({ index, rowIndex }: Props): JSX.Element => {
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

        // saveItemHeightByIndex({ index })
        const clickedIconElement = e.target

        if (!(clickedIconElement instanceof Element)) return

        const boqRowElement = clickedIconElement.closest('.tr')
        if (!boqRowElement) return

        dispatch(itemsSlice.actions.saveBoqRowHeightAndWidth({
          index,
          rowIndex,
          height: boqRowElement.clientHeight,
          width: boqRowElement.clientWidth,
        }))

        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const item = getState().items[index]
        if (item?.type !== 'boq') return
        const boqRow = item.boq.rows[rowIndex]
        if (!boqRow) return

        const itemForCopyContainer = { ...boqRow, previewHtml: cleanedHtml }

        dispatch(copySlice.actions.addItemIntoCopyContainer(itemForCopyContainer))
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    >
      <MdCopyAll />
    </motion.span>
  )
}
