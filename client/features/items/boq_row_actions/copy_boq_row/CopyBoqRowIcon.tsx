import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import { getBoqRowFromStore, isItemsFroalaSignal, itemsSlice, useItem, useRow } from '@entities/items'
import { className } from '@shared/consts/className'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CopyBoqRowIcon = (): JSX.Element => {
  const { rowIndex } = useRow()
  const { itemIndex } = useItem()
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <MdCopyAll
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
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
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    />
  )
}
