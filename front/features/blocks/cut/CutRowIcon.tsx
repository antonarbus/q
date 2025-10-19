import { copySlice } from '@entities/copy/copySlice'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { selectIsLastRow } from '@entities/quotation/redux/selector/selectIsLastRow'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { getClosestRowHtml } from '@shared/util/html-getter/getClosestRowHtml'
import type { JSX, MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'

export const CutRowIcon = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const isLastRow = useSelector(selectIsLastRow({ blockIndex: block.index }))
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isLastRow || isDeletable === false || isCopyable === false

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

            const rowElement = clickedIconElement.closest(`.${cls.row}`)

            if (rowElement === null) {
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
              quotationSlice.actions.updateRowHeightAndWidthReducer({
                blockIndex: block.index,
                rowIndex: row.index,
                height: rowElement.clientHeight,
                width: rowElement.clientWidth,
              }),
            )

            const rowFromStore = getRowFromStore({
              blockIndex: block.index,
              rowIndex: row.index,
            })

            if (rowFromStore === undefined) {
              return
            }

            const html = getClosestRowHtml(event)
            const rowFromStoreCloned = structuredClone(rowFromStore)
            rowFromStoreCloned.preview = html

            dispatch(
              copySlice.actions.addItem({
                item: rowFromStoreCloned,
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
              quotationSlice.actions.deleteRowReducer({
                blockIndex: block.index,
                rowIndex: row.index,
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
