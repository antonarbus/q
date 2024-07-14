import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import {
  getBoqRowFromStore,
  isFroalaSignal,
  quotationSlice,
  selectIsLastBoqRow,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CutBoqRowIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelectorTyped((state) => state.copy.isCopyable)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ blockIndex }))
  const isDeletable = useSelectorTyped((state) => state.copy.isDeletable)
  const disabled = isLastBoqRow || !isDeletable || !isCopyable

  return (
    <TbCut
      className='cut-boq-row-icon'
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        const clickedIconElement = e.target

        if (!(clickedIconElement instanceof Element)) return

        const boqRowElement = clickedIconElement.closest(`.${cls.boqRow}`)

        if (!boqRowElement) return

        isFroalaSignal.value = false

        dispatch(
          quotationSlice.actions.updateBoqRowHeightAndWidthReducer({
            blockIndex,
            rowIndex,
            height: boqRowElement.clientHeight,
            width: boqRowElement.clientWidth,
          }),
        )

        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
        if (boqRow === undefined) return

        const item = structuredClone(boqRow)
        item.preview = cleanedHtml

        dispatch(copySlice.actions.addItemIntoCopyContainer({ item }))

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.showCopyContainer())
        }

        dispatch(
          quotationSlice.actions.deleteBoqRowReducer({ blockIndex, rowIndex }),
        )
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
        }, 1000 * theme.item.animationDuration)
      }}
    />
  )
}
