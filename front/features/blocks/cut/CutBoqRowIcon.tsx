import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { MouseEvent, JSX } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import {
  getBoqRowFromStore,
  quotationSlice,
  selectIsLastBoqRow,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/const/cls'
import { Tooltip } from '@mui/material'
import { getClosestRowHtml } from '@shared/util/html-getter/getClosestRowHtml'
import { textSlice } from '@shared/lib/froala/textSlice'

export const CutBoqRowIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const isLastBoqRow = useSelector(selectIsLastBoqRow({ blockIndex }))
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isLastBoqRow || isDeletable === false || isCopyable === false

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='left'
      title='Cut'
    >
      <span className={cls.actionIconContainer}>
        <TbCut
          className={cls.actionIcon}
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
            const bockRowCloned = structuredClone(boqRow)
            bockRowCloned.preview = html

            dispatch(
              copySlice.actions.addItem({
                item: bockRowCloned,
              }),
            )

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
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
          style={{
            color: disabled === true ? '#acacac' : '#000',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
