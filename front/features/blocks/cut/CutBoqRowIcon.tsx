import { copySlice } from '@entities/copy/copySlice'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { selectIsLastBoqRow } from '@entities/quotation/redux/selector/selectIsLastBoqRow'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { getClosestRowHtml } from '@shared/util/html-getter/getClosestRowHtml'
import type { JSX, MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'

export const CutBoqRowIcon = (): JSX.Element => {
  const block = useBlock()
  const { rowIndex } = useRow()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const isLastBoqRow = useSelector(
    selectIsLastBoqRow({ blockIndex: block.index }),
  )
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isLastBoqRow || isDeletable === false || isCopyable === false

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='left' title='Cut'>
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

            // Save scroll position before setNotEditable
            const scrollX = window.scrollX
            const scrollY = window.scrollY

            dispatch(textSlice.actions.setNotEditable())

            // Restore scroll position after React renders
            requestAnimationFrame(() => {
              window.scrollTo(scrollX, scrollY)
            })

            dispatch(
              quotationSlice.actions.updateBoqRowHeightAndWidthReducer({
                blockIndex: block.index,
                rowIndex,
                height: boqRowElement.clientHeight,
                width: boqRowElement.clientWidth,
              }),
            )

            const boqRow = getBoqRowFromStore({
              blockIndex: block.index,
              rowIndex,
            })

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
              dispatch(
                copySlice.actions.showCopyModal({
                  initCursorPos: { x: event.clientX, y: event.clientY },
                }),
              )
            }

            dispatch(
              quotationSlice.actions.deleteBoqRowReducer({
                blockIndex: block.index,
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
