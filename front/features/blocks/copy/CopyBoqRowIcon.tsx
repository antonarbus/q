import { dispatch, getState, useSelector } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import {
  getBoqRowFromStore,
  quotationSlice,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { Tooltip } from '@mui/material'
import { getClosestRowHtml } from '@shared/utils/htmlGetter/getClosestRowHtml'
import { textSlice } from '@shared/lib/froala/textSlice'

export const CopyBoqRowIcon = (): React.JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const disabled = isCopyable === false

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
            color: disabled === true ? '#acacac' : '#000',
          }}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const clickedIconElement = event.target

            if (clickedIconElement instanceof Element === false) {
              return
            }

            const boqRowElement = clickedIconElement.closest(`.${cls.boqRow}`)

            if (boqRowElement === null) {
              return
            }

            dispatch(textSlice.actions.setNotEditable())

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

            const html = getClosestRowHtml(event)
            const boqRowCloned = structuredClone(boqRow)
            boqRowCloned.preview = html

            dispatch(
              copySlice.actions.addItem({
                item: boqRowCloned,
              }),
            )

            dispatch(copySlice.actions.allowToPaste())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(copySlice.actions.showCopyModal())
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
