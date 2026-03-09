import { copySlice } from '@entity/copy/copySlice'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { getClosestRowHtml } from '@shared/util/html-getter/getClosestRowHtml'
import { MdCopyAll } from 'react-icons/md'
import { lockScrollOnce } from '@shared/lib/lockScrollOnce'

export const CopyRowIcon = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const disabled = isCopyable === false

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='left'
      title='Copy'
    >
      <span className={cls.actionIconContainer}>
        <MdCopyAll
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

            lockScrollOnce()

            dispatch(textSlice.actions.setNotEditable())

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

            dispatch(
              copySlice.actions.addItem({
                item: rowFromStore,
                preview: html,
              }),
            )

            dispatch(copySlice.actions.allowToPaste())

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
