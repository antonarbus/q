import { clipboardSlice } from '@front/entities/clipboard/clipboardSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { getClosestRowHtml } from '@front/shared/util/html-getter/getClosestRowHtml'
import { MdCopyAll } from 'react-icons/md'

export const CopyRowIcon = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const isCopyable = reduxHolder.useSelector((state) => state.clipboard.isCopyable)
  const disabled = isCopyable === false

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='left' title='Copy'>
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

            reduxHolder.dispatch(
              quotationSlice.actions.updateRowHeightAndWidth({
                blockIndex: block.index,
                rowIndex: row.index,
                height: rowElement.clientHeight,
                width: rowElement.clientWidth,
              }),
            )

            const rowFromStore = getRowFromStoreByIndex({
              blockIndex: block.index,
              rowIndex: row.index,
            })

            if (rowFromStore === undefined) {
              return
            }

            const html = getClosestRowHtml(event)

            reduxHolder.dispatch(
              clipboardSlice.actions.addItem({
                item: rowFromStore,
                preview: html,
              }),
            )

            reduxHolder.dispatch(clipboardSlice.actions.allowToPaste())

            const isClipboardModalVisible = reduxHolder.getState().clipboard.isVisible

            if (isClipboardModalVisible === false) {
              reduxHolder.dispatch(
                clipboardSlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

              reduxHolder.dispatch(clipboardSlice.actions.showClipboardModal())
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
