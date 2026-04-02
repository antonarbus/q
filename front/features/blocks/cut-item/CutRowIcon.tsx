import { copySlice } from '@front/entities/copy/copySlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { selectIsLastRow } from '@front/entities/quotation/redux/selector/selectIsLastRow'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux'
import { theme } from '@front/shared/theme'
import { getClosestRowHtml } from '@front/shared/util/html-getter/getClosestRowHtml'
import { TbCut } from 'react-icons/tb'

export const CutRowIcon = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const isCopyable = reduxHolder.useSelector((state) => state.copy.isCopyable)

  const isLastRow = reduxHolder.useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isDeletable = reduxHolder.useSelector((state) => state.copy.isDeletable)
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
              copySlice.actions.addItem({
                item: rowFromStore,
                preview: html,
              }),
            )

            const isCopyModalVisible = reduxHolder.getState().copy.isVisible

            if (isCopyModalVisible === false) {
              reduxHolder.dispatch(
                copySlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

              reduxHolder.dispatch(copySlice.actions.showCopyModal())
            }

            reduxHolder.dispatch(
              quotationSlice.actions.deleteRow({
                blockIndex: block.index,
                rowIndex: row.index,
              }),
            )

            recalculateSubTotalPrices({ incrementally: true })
            recalculateTotalPrices()

            reduxHolder.dispatch(copySlice.actions.forbidAllActions())

            setTimeout(() => {
              reduxHolder.dispatch(copySlice.actions.allowAllActions())
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
