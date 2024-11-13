import { dispatch, getState, useSelector } from '@shared/lib/redux'
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
import { getClosestRowHtml } from '@shared/utils/htmlGetter/getClosestRowHtml'

export const CopyBoqRowIcon = (): React.JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <Tooltip
      title='Copy'
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
            if (disabled) {
              return
            }

            const clickedIconElement = e.target

            if (!(clickedIconElement instanceof Element)) {
              return
            }

            const boqRowElement = clickedIconElement.closest(`.${cls.boqRow}`)

            if (!boqRowElement) {
              return
            }

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

            if (boqRow === undefined) {
              return
            }

            const html = getClosestRowHtml(e)
            const boqRowCloned = structuredClone(boqRow)
            boqRowCloned.preview = html

            dispatch(
              copySlice.actions.addItem({
                item: boqRowCloned,
              }),
            )

            dispatch(copySlice.actions.allowToPaste())

            const isCopyModalVisible = getState().copy.isVisible

            if (!isCopyModalVisible) {
              dispatch(copySlice.actions.showCopyModal())
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
