import { copySlice } from '@entity/copy/copySlice'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { selectIsLastRow } from '@entity/quotation/redux/selector/selectIsLastRow'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { getClosestRowHtml } from '@shared/util/html-getter/getClosestRowHtml'
import { TbCut } from 'react-icons/tb'

export const CutRowIcon = (): React.JSX.Element => {
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
          onClick={(event: React.MouseEvent): void => {
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

            dispatch(
              quotationSlice.actions.updateRowHeightAndWidth({
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

            dispatch(
              copySlice.actions.addItem({
                item: rowFromStore,
                preview: html,
              }),
            )

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(
                copySlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

              dispatch(copySlice.actions.showCopyModal())
            }

            dispatch(
              quotationSlice.actions.deleteRow({
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
