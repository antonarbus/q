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
import { Tooltip } from '@mui/material'
import { getClosestRowHtml } from '@shared/utils/htmlGetter/getClosestRowHtml'

export const CutBoqRowIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelectorTyped((state) => state.copy.isCopyable)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ blockIndex }))
  const isDeletable = useSelectorTyped((state) => state.copy.isDeletable)
  const disabled = isLastBoqRow || !isDeletable || !isCopyable

  return (
    <Tooltip
      title='Cut'
      placement='left'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <TbCut
          className={cls.actionIcon}
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

            const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
            if (boqRow === undefined) return

            const html = getClosestRowHtml(e)
            const bockRowCloned = structuredClone(boqRow)
            bockRowCloned.preview = html

            dispatch(
              copySlice.actions.addItem({
                item: bockRowCloned,
              }),
            )

            const isCopyModalVisible = getState().copy.isVisible

            if (!isCopyModalVisible) {
              dispatch(copySlice.actions.showCopyModal())
            }

            dispatch(
              quotationSlice.actions.deleteBoqRowReducer({
                blockIndex,
                rowIndex,
              }),
            )

            dispatch(copySlice.actions.forbidAllActions())

            setTimeout(() => {
              dispatch(copySlice.actions.allowAllActions())
            }, 1000 * theme.block.animationDuration)
          }}
        />
      </span>
    </Tooltip>
  )
}
