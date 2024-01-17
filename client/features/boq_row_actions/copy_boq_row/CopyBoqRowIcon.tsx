import { useSelectorTyped } from '@shared/hooks'
import { dispatch, getState } from '@shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from '@shared/lib/itemsUtils'
import { copySlice } from '@entities/copy'
import { getBoqRowFromStore, itemsSlice, useItem, useRow } from '@entities/items'
import type { MouseEvent } from 'react'
import { className } from '@shared/className'
import { appSlice } from '@entities/app'

export const CopyBoqRowIcon = (): JSX.Element => {
  const { rowIndex } = useRow()
  const { itemIndex } = useItem()
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
