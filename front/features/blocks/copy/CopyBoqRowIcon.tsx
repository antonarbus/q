import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import {
  getBoqRowFromStore,
  isFroalaSignal,
  quotationSlice,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { Tooltip } from '@mui/material'
import { getClosestRowHtml } from '@shared/utils'

export const CopyBoqRowIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelectorTyped((state) => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <Tooltip
      title='copy'
      placement='left'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdCopyAll
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
            const boqRowCloned = structuredClone(boqRow)
            boqRowCloned.preview = html

            dispatch(
              copySlice.actions.addItemIntoCopyContainer({
                item: boqRowCloned,
              }),
            )

            dispatch(copySlice.actions.allowToPaste())

            const isCopyContainer = getState().copy.isCopyContainer

            if (!isCopyContainer) {
              dispatch(copySlice.actions.showCopyContainer())
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
